import json

import httpx

from app.config import get_settings
from app.schemas.question import SourcePaper


class LlmService:
    async def generate_medical_answer(self, query: str, sources: list[SourcePaper]) -> dict | None:
        settings = get_settings()
        provider = settings.llm_provider.lower()

        if provider == "groq" and settings.groq_api_key:
            return await self._chat_completion(
                url="https://api.groq.com/openai/v1/chat/completions",
                api_key=settings.groq_api_key,
                model=settings.llm_model,
                query=query,
                sources=sources,
                referer=None,
            )

        if provider == "openrouter" and settings.openrouter_api_key:
            return await self._chat_completion(
                url="https://openrouter.ai/api/v1/chat/completions",
                api_key=settings.openrouter_api_key,
                model=settings.llm_model,
                query=query,
                sources=sources,
                referer="https://cliniqai.local",
            )

        if provider == "openai" and settings.openai_api_key:
            return await self._chat_completion(
                url="https://api.openai.com/v1/chat/completions",
                api_key=settings.openai_api_key,
                model=settings.llm_model,
                query=query,
                sources=sources,
                referer=None,
            )

        return None

    async def _chat_completion(
        self,
        url: str,
        api_key: str,
        model: str,
        query: str,
        sources: list[SourcePaper],
        referer: str | None,
    ) -> dict | None:
        settings = get_settings()
        headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
        if referer:
            headers["HTTP-Referer"] = referer
            headers["X-Title"] = "CliniqAI"

        payload = {
            "model": model,
            "temperature": 0.15,
            "response_format": {"type": "json_object"},
            "messages": [
                {"role": "system", "content": self._system_prompt()},
                {"role": "user", "content": self._user_prompt(query, sources)},
            ],
        }

        async with httpx.AsyncClient(timeout=settings.request_timeout_seconds + 20) as client:
            response = await client.post(url, headers=headers, json=payload)
            response.raise_for_status()
            content = response.json()["choices"][0]["message"]["content"]

        try:
            parsed = json.loads(content)
        except json.JSONDecodeError:
            return None

        if not isinstance(parsed, dict):
            return None
        return parsed

    def _system_prompt(self) -> str:
        return (
            "You are CliniqAI, a medical evidence agent for doctors. "
            "Answer using only the provided PubMed and Europe PMC source snippets. "
            "Do not use general web knowledge. Do not invent citations. "
            "Do not diagnose a patient or give patient-specific treatment orders. "
            "If evidence is limited, still provide a cautious evidence-limited summary, clearly saying uncertainty is high. "
            "Return strict JSON with keys: direct_answer, key_findings, confidence, clinical_note."
        )

    def _user_prompt(self, query: str, sources: list[SourcePaper]) -> str:
        source_blocks = []
        for index, source in enumerate(sources[:8], start=1):
            source_blocks.append(
                "\n".join(
                    [
                        f"[{index}] {source.title}",
                        f"Source: {source.source}",
                        f"Authors: {source.authors or 'Not listed'}",
                        f"Journal: {source.journal or 'Not listed'}",
                        f"Year: {source.year or 'Not listed'}",
                        f"PMID: {source.pmid or 'N/A'}",
                        f"DOI: {source.doi or 'N/A'}",
                        f"Abstract: {(source.abstract or 'No abstract available')[:2400]}",
                    ]
                )
            )

        return (
            f"Question: {query}\n\n"
            "Use citations like [1], [2] in the direct answer and key findings. "
            "Keep direct_answer 5 to 8 lines maximum. "
            "Return key_findings as 3 to 5 bullets. Confidence must be High, Medium, or Low.\n\n"
            f"Sources:\n\n{chr(10).join(source_blocks)}"
        )


llm_service = LlmService()

