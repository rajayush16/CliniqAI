from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    app_name: str = "CliniqAI API"
    database_url: str = Field(default="sqlite:///./cliniqai.db", alias="DATABASE_URL")
    redis_url: str | None = Field(default=None, alias="REDIS_URL")
    jwt_secret: str = Field(default="dev-only-change-me", alias="JWT_SECRET")
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 8
    openai_api_key: str | None = Field(default=None, alias="OPENAI_API_KEY")
    ncbi_api_key: str | None = Field(default=None, alias="NCBI_API_KEY")
    frontend_url: str = Field(default="http://localhost:5173", alias="FRONTEND_URL")
    request_timeout_seconds: float = 12.0
    max_sources: int = 8


@lru_cache
def get_settings() -> Settings:
    return Settings()

