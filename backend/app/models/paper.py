from datetime import datetime, timezone

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class SavedPaper(Base):
    __tablename__ = "saved_papers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(Text, nullable=False)
    authors: Mapped[str | None] = mapped_column(Text)
    journal: Mapped[str | None] = mapped_column(String(255))
    year: Mapped[str | None] = mapped_column(String(20))
    pmid: Mapped[str | None] = mapped_column(String(50), index=True)
    doi: Mapped[str | None] = mapped_column(String(255), index=True)
    source_url: Mapped[str] = mapped_column(Text, nullable=False)
    abstract: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False
    )

    user = relationship("User", back_populates="saved_papers")

