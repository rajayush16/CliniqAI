from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import desc, select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.paper import SavedPaper
from app.models.user import User
from app.schemas.paper import PaperRead, PaperSave
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/papers", tags=["papers"])


@router.post("/save", response_model=PaperRead, status_code=status.HTTP_201_CREATED)
def save_paper(
    payload: PaperSave,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> SavedPaper:
    paper = SavedPaper(user_id=current_user.id, **payload.model_dump())
    db.add(paper)
    db.commit()
    db.refresh(paper)
    return paper


@router.get("/saved", response_model=list[PaperRead])
def saved_papers(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> list[SavedPaper]:
    return list(
        db.scalars(
            select(SavedPaper).where(SavedPaper.user_id == current_user.id).order_by(desc(SavedPaper.created_at))
        )
    )


@router.delete("/{paper_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_paper(
    paper_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> None:
    paper = db.get(SavedPaper, paper_id)
    if not paper or paper.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Saved paper not found")
    db.delete(paper)
    db.commit()

