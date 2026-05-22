import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.database import init_db
from app.routes import auth, health, papers, questions

logger = logging.getLogger(__name__)

settings = get_settings()

app = FastAPI(title=settings.app_name, version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.get("/")
def root() -> str:
    return "CliniqAI API is running"


@app.on_event("startup")
def on_startup() -> None:
    init_db()
    logger.info("CliniqAI started — allowed CORS origins: %s", settings.allowed_origins)
    logger.info("LLM provider: %s | model: %s", settings.llm_provider, settings.llm_model)


app.include_router(health.router, prefix="/api")
app.include_router(auth.router, prefix="/api")
app.include_router(questions.router, prefix="/api")
app.include_router(papers.router, prefix="/api")
