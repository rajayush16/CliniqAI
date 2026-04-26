from app.schemas.question import SourcePaper


def citation_label(source: SourcePaper, index: int) -> str:
    identifier = source.pmid or source.doi or source.source
    return f"[{index}] {identifier}"


def format_citations(sources: list[SourcePaper]) -> list[str]:
    return [citation_label(source, index + 1) for index, source in enumerate(sources)]

