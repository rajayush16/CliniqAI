import asyncio
import time

from app.config import get_settings
from app.schemas.question import AskQuestionRequest, AskQuestionResponse, SourcePaper
from app.services.europe_pmc_service import europe_pmc_service
from app.services.pubmed_service import pubmed_service
from app.utils.citations import format_citations
from app.utils.ranking import rank_sources


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

        ranked = rank_sources(request.query, sources, limit=get_settings().max_sources)
        answer, key_findings, confidence = self._generate_answer(request.query, ranked)
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
        normalized = query.strip().rstrip("?")
        return f"{normalized} clinical evidence"

    def _generate_answer(self, query: str, sources: list[SourcePaper]) -> tuple[str, list[str], str]:
        strong_sources = [source for source in sources if source.score >= 2]
        if len(strong_sources) < 2:
            return (
                "Not enough reliable evidence found.",
                ["The trusted source search returned too few relevant records for a cited answer."],
                "Low",
            )

        citations = format_citations(strong_sources[:4])
        answer = (
            f"Based on the retrieved PubMed and Europe PMC literature, the evidence relevant to '{query}' "
            f"is summarized across {len(strong_sources)} cited sources. The highest-ranked records support a cautious, "
            "evidence-focused interpretation rather than a patient-specific diagnosis or treatment plan. "
            f"See {', '.join(citations[:3])} for the primary supporting literature."
        )
        key_findings = [
            f"{source.title[:180]} ({source.year or 'year not listed'}) supports the answer context."
            for source in strong_sources[:4]
        ]
        confidence = "High" if len(strong_sources) >= 5 else "Medium"
        return answer, key_findings, confidence


rag_service = RagService()

