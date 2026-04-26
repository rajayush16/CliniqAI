from datetime import datetime

from pydantic import BaseModel, Field


class QuestionFilters(BaseModel):
    recent_only: bool = False
    last_five_years: bool = False
    review_only: bool = False
    clinical_trials_only: bool = False


class AskQuestionRequest(BaseModel):
    query: str = Field(min_length=8, max_length=1200)
    filters: QuestionFilters = Field(default_factory=QuestionFilters)


class SourcePaper(BaseModel):
    title: str
    authors: str | None = None
    journal: str | None = None
    year: str | None = None
    pmid: str | None = None
    doi: str | None = None
    source: str
    source_url: str
    abstract: str | None = None
    score: float = 0


class AskQuestionResponse(BaseModel):
    id: int
    query: str
    answer: str
    confidence: str
    evidence_strength: str
    key_findings: list[str]
    citations: list[SourcePaper]
    response_time_ms: int
    cached: bool = False
    created_at: datetime


class QuestionHistoryItem(BaseModel):
    id: int
    query: str
    answer: str
    confidence: str
    response_time_ms: int
    sources_json: list[dict]
    created_at: datetime

    model_config = {"from_attributes": True}

