from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/")
def root() -> str:
    return "CliniqAI API is running"


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}

