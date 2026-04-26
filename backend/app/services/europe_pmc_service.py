import httpx

from app.config import get_settings
from app.schemas.question import QuestionFilters, SourcePaper


class EuropePmcService:
    base_url = "https://www.ebi.ac.uk/europepmc/webservices/rest/search"

    async def search(self, query: str, filters: QuestionFilters, limit: int = 8) -> list[SourcePaper]:
        settings = get_settings()
        params = {
            "query": self._build_query(query, filters),
            "format": "json",
            "pageSize": str(limit),
            "resultType": "core",
        }
        async with httpx.AsyncClient(timeout=settings.request_timeout_seconds) as client:
            response = await client.get(self.base_url, params=params)
            response.raise_for_status()
            results = response.json().get("resultList", {}).get("result", [])
        return [self._to_source(item) for item in results]

    def _build_query(self, query: str, filters: QuestionFilters) -> str:
        clauses = [query]
        if filters.last_five_years or filters.recent_only:
            clauses.append("FIRST_PDATE:[2021-01-01 TO 3000-12-31]")
        if filters.review_only:
            clauses.append('PUB_TYPE:"review"')
        if filters.clinical_trials_only:
            clauses.append('PUB_TYPE:"clinical trial"')
        return " AND ".join(clauses)

    def _to_source(self, item: dict) -> SourcePaper:
        pmid = item.get("pmid")
        doi = item.get("doi")
        source_url = (
            f"https://pubmed.ncbi.nlm.nih.gov/{pmid}/"
            if pmid
            else f"https://europepmc.org/article/{item.get('source', 'MED')}/{item.get('id', '')}"
        )
        return SourcePaper(
            title=item.get("title") or "Untitled Europe PMC record",
            authors=item.get("authorString"),
            journal=item.get("journalTitle"),
            year=item.get("pubYear"),
            pmid=pmid,
            doi=doi,
            source="Europe PMC",
            source_url=source_url,
            abstract=item.get("abstractText"),
        )


europe_pmc_service = EuropePmcService()

