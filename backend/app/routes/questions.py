from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import desc, select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.question import Question
from app.models.user import User
from app.schemas.question import AskQuestionRequest, AskQuestionResponse, QuestionHistoryItem
from app.services.auth_service import get_current_user
from app.services.cache_service import cache_service
from app.services.rag_service import rag_service

router = APIRouter(prefix="/questions", tags=["questions"])


@router.post("/ask", response_model=AskQuestionResponse)
async def ask_question(
    payload: AskQuestionRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> AskQuestionResponse:
    cache_key = cache_service.cache_key(current_user.id, payload.query, payload.filters.model_dump())
    cached = await cache_service.get(cache_key)
    if cached:
        return AskQuestionResponse(**cached, cached=True)

    created_at = datetime.now(timezone.utc)
    provisional_id = 0
    response = await rag_service.answer_question(payload, question_id=provisional_id, created_at=created_at)
    record = Question(
        user_id=current_user.id,
        query=payload.query,
        answer=response.answer,
        confidence=response.confidence,
        response_time_ms=response.response_time_ms,
        sources_json=[source.model_dump() for source in response.citations],
        created_at=created_at,
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    response.id = record.id
    await cache_service.set(cache_key, response.model_dump(mode="json"))
    return response


@router.get("/history", response_model=list[QuestionHistoryItem])
def history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> list[Question]:
    return list(
        db.scalars(
            select(Question).where(Question.user_id == current_user.id).order_by(desc(Question.created_at)).limit(50)
        )
    )


@router.get("/{question_id}", response_model=QuestionHistoryItem)
def get_question(
    question_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Question:
    question = db.get(Question, question_id)
    if not question or question.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Question not found")
    return question


@router.delete("/{question_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_question(
    question_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> None:
    question = db.get(Question, question_id)
    if not question or question.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Question not found")
    db.delete(question)
    db.commit()
