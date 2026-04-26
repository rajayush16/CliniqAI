from datetime import datetime

from pydantic import BaseModel, Field


class PaperBase(BaseModel):
    title: str = Field(min_length=2)
    authors: str | None = None
    journal: str | None = None
    year: str | None = None
    pmid: str | None = None
    doi: str | None = None
    source_url: str
    abstract: str | None = None


class PaperSave(PaperBase):
    pass


class PaperRead(PaperBase):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}

