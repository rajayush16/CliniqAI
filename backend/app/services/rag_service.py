import asyncio
import re
import time

from app.config import get_settings
from app.schemas.question import AskQuestionRequest, AskQuestionResponse, SourcePaper
from app.services.europe_pmc_service import europe_pmc_service
from app.services.llm_service import llm_service
from app.services.pubmed_service import pubmed_service
from app.utils.citations import format_citations
from app.utils.ranking import rank_sources


# Common filler phrases to strip before building a search query
_FILLER = re.compile(
    r"\b(give me|tell me|what (is|are)|explain|describe|provide|discuss|list|show me|"
    r"summarize|i want|please|can you|could you|help me|how to|how do i)\b",
    re.IGNORECASE,
)


class RagService:
    async def answer_question(self, request: AskQuestionRequest, question_id: int, created_at) -> AskQuestionResponse:
        started = time.perf_counter()
        rewritten_query = self._rewrite_query(request.query)

        results = await asyncio.gather(
            pubmed_service.search(rewritten_query, request.filters),
            europe_pmc_service.search(rewritten_query, request.filters),
            return_exceptions=True,
        )
        sources: list[SourcePaper] = []
        for result in results:
            if isinstance(result, list):
                sources.extend(result)

        # Filter out records with no abstract — conference proceedings & indexes
        # have no clinical content and poison the LLM context.
        sources_with_content = [s for s in sources if s.abstract and len(s.abstract.strip()) > 80]
        # Fall back to all sources only if filtering leaves nothing
        usable_pool = sources_with_content if sources_with_content else sources

        ranked = rank_sources(request.query, usable_pool, limit=get_settings().max_sources)
        answer, key_findings, confidence = await self._generate_answer(request.query, ranked)
        response_time_ms = int((time.perf_counter() - started) * 1000)

        return AskQuestionResponse(
            id=question_id,
            query=request.query,
            answer=answer,
            confidence=confidence,
            evidence_strength=confidence,
            key_findings=key_findings,
            citations=ranked,
            response_time_ms=response_time_ms,
            created_at=created_at,
        )

    def _rewrite_query(self, query: str) -> str:
        """
        Convert a natural-language clinical question into a concise PubMed/Europe PMC
        search string by:
          1. Stripping conversational filler ("give me", "tell me", etc.)
          2. Keeping clinically meaningful terms
          3. Appending a focused qualifier instead of the generic "clinical evidence"
        """
        cleaned = _FILLER.sub("", query).strip().rstrip("?").strip()
        # Collapse multiple spaces left after stripping filler
        cleaned = re.sub(r"\s{2,}", " ", cleaned)

        # Detect the type of clinical question and add a targeted qualifier
        lower = cleaned.lower()
        if any(kw in lower for kw in ("differential diagnosis", "ddx", "differentials")):
            qualifier = "differential diagnosis management"
        elif any(kw in lower for kw in ("workup", "work up", "diagnostic workup", "investigation")):
            qualifier = "diagnosis workup clinical"
        elif any(kw in lower for kw in ("treatment", "therapy", "manage", "management")):
            qualifier = "treatment guidelines"
        elif any(kw in lower for kw in ("pathophysiology", "mechanism", "pathogenesis")):
            qualifier = "pathophysiology review"
        else:
            qualifier = "clinical review diagnosis management"

        return f"{cleaned} {qualifier}"

    async def _generate_answer(self, query: str, sources: list[SourcePaper]) -> tuple[str, list[str], str]:
        # Lower the score threshold — a score of 1 still means real keyword overlap
        strong_sources = [source for source in sources if source.score >= 1]
        usable_sources = strong_sources if strong_sources else sources[:4]
        if not usable_sources:
            return (
                "I could not retrieve reliable PubMed or Europe PMC evidence for this question. "
                "Try rephrasing using specific medical terms (e.g. 'dyspnoea obesity differential diagnosis').",
                ["No trusted medical source records with abstracts were available for this query."],
                "Low",
            )

        llm_answer = await llm_service.generate_medical_answer(query, usable_sources)
        if llm_answer:
            return (
                str(llm_answer.get("direct_answer") or "").strip()
                or "Evidence was retrieved, but the AI response could not be formatted.",
                [str(item) for item in llm_answer.get("key_findings", [])][:5],
                str(llm_answer.get("confidence") or "Low"),
            )

        citations = format_citations(usable_sources[:4])
        answer = (
            f"Based on the retrieved PubMed and Europe PMC literature, the evidence relevant to '{query}' "
            f"is summarized across {len(usable_sources)} cited sources. The highest-ranked records support a cautious, "
            "evidence-focused interpretation rather than a patient-specific diagnosis or treatment plan. "
            f"See {', '.join(citations[:3])} for the primary supporting literature."
        )
        key_findings = [
            f"{source.title[:180]} ({source.year or 'year not listed'}) supports the answer context."
            for source in usable_sources[:4]
        ]
        confidence = "High" if len(strong_sources) >= 5 else "Medium" if len(usable_sources) >= 2 else "Low"
        return answer, key_findings, confidence


rag_service = RagService()
