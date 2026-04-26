import httpx
import xml.etree.ElementTree as ET

from app.config import get_settings
from app.schemas.question import QuestionFilters, SourcePaper


class PubMedService:
    base_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils"

    async def search(self, query: str, filters: QuestionFilters, limit: int = 8) -> list[SourcePaper]:
        settings = get_settings()
        term = self._build_term(query, filters)
        params = {
            "db": "pubmed",
            "term": term,
            "retmode": "json",
            "retmax": str(limit),
            "sort": "relevance",
        }
        if settings.ncbi_api_key:
            params["api_key"] = settings.ncbi_api_key

        async with httpx.AsyncClient(timeout=settings.request_timeout_seconds) as client:
            search_response = await client.get(f"{self.base_url}/esearch.fcgi", params=params)
            search_response.raise_for_status()
            ids = search_response.json().get("esearchresult", {}).get("idlist", [])
            if not ids:
                return []

            summary_response = await client.get(
                f"{self.base_url}/esummary.fcgi",
                params={"db": "pubmed", "id": ",".join(ids), "retmode": "json"},
            )
            summary_response.raise_for_status()
            summary = summary_response.json().get("result", {})
            abstracts = await self._fetch_abstracts(client, ids)

        return [self._to_source(summary.get(pmid, {}), pmid, abstracts.get(pmid)) for pmid in ids if summary.get(pmid)]

    async def _fetch_abstracts(self, client: httpx.AsyncClient, ids: list[str]) -> dict[str, str]:
        if not ids:
            return {}

        response = await client.get(
            f"{self.base_url}/efetch.fcgi",
            params={"db": "pubmed", "id": ",".join(ids), "retmode": "xml"},
        )
        response.raise_for_status()
        root = ET.fromstring(response.text)
        abstracts: dict[str, str] = {}
        for article in root.findall(".//PubmedArticle"):
            pmid = article.findtext(".//PMID")
            abstract_parts = [node.text or "" for node in article.findall(".//AbstractText")]
            if pmid and abstract_parts:
                abstracts[pmid] = " ".join(part.strip() for part in abstract_parts if part.strip())
        return abstracts

    def _build_term(self, query: str, filters: QuestionFilters) -> str:
        terms = [query]
        if filters.last_five_years or filters.recent_only:
            terms.append('"last 5 years"[PDat]')
        if filters.review_only:
            terms.append("review[Publication Type]")
        if filters.clinical_trials_only:
            terms.append("clinical trial[Publication Type]")
        return " AND ".join(terms)

    def _to_source(self, item: dict, pmid: str, abstract: str | None) -> SourcePaper:
        authors = item.get("authors") or []
        names = ", ".join(author.get("name", "") for author in authors[:5] if author.get("name"))
        article_ids = item.get("articleids") or []
        doi = next((entry.get("value") for entry in article_ids if entry.get("idtype") == "doi"), None)
        return SourcePaper(
            title=item.get("title") or "Untitled PubMed record",
            authors=names or None,
            journal=item.get("fulljournalname") or item.get("source"),
            year=(item.get("pubdate") or "")[:4] or None,
            pmid=pmid,
            doi=doi,
            source="PubMed",
            source_url=f"https://pubmed.ncbi.nlm.nih.gov/{pmid}/",
            abstract=abstract or item.get("title"),
        )


pubmed_service = PubMedService()
