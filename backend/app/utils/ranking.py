import re
from datetime import datetime

from app.schemas.question import SourcePaper


TOKEN_RE = re.compile(r"[a-zA-Z0-9]+")


def tokenize(text: str) -> set[str]:
    return {token.lower() for token in TOKEN_RE.findall(text) if len(token) > 2}


def rank_sources(query: str, sources: list[SourcePaper], limit: int = 8) -> list[SourcePaper]:
    query_tokens = tokenize(query)
    current_year = datetime.now().year

    ranked: list[SourcePaper] = []
    seen: set[str] = set()
    for source in sources:
        key = source.pmid or source.doi or source.source_url
        if key in seen:
            continue
        seen.add(key)

        haystack = f"{source.title} {source.abstract or ''} {source.journal or ''}"
        overlap = len(query_tokens & tokenize(haystack))
        year_bonus = 0.0
        if source.year and source.year.isdigit():
            age = max(current_year - int(source.year), 0)
            year_bonus = max(0, 8 - age) / 8
        publication_bonus = 0.3 if source.pmid or source.doi else 0
        source.score = round(overlap + year_bonus + publication_bonus, 3)
        ranked.append(source)

    return sorted(ranked, key=lambda item: item.score, reverse=True)[:limit]

