from functools import lru_cache
import shlex

from pydantic import Field, field_validator
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
    openrouter_api_key: str | None = Field(default=None, alias="OPENROUTER_API_KEY")
    groq_api_key: str | None = Field(default=None, alias="GROQ_API_KEY")
    llm_provider: str = Field(default="openrouter", alias="LLM_PROVIDER")
    llm_model: str = Field(default="openrouter/free", alias="LLM_MODEL")
    ncbi_api_key: str | None = Field(default=None, alias="NCBI_API_KEY")
    frontend_url: str = Field(default="http://localhost:5173", alias="FRONTEND_URL")
    cors_origins: str = Field(default="", alias="CORS_ORIGINS")
    request_timeout_seconds: float = 12.0
    max_sources: int = 8

    @field_validator("database_url", mode="before")
    @classmethod
    def normalize_database_url(cls, value: str | None) -> str:
        if not value:
            return "sqlite:///./cliniqai.db"

        value = value.strip().strip('"').strip("'")
        if value.startswith("postgresql://"):
            return value.replace("postgresql://", "postgresql+psycopg://", 1)
        return value

    @field_validator("redis_url", mode="before")
    @classmethod
    def normalize_redis_url(cls, value: str | None) -> str | None:
        if not value:
            return None

        value = value.strip().strip('"').strip("'")
        if not value:
            return None

        uses_tls = False
        if value.startswith("redis-cli"):
            parts = shlex.split(value)
            uses_tls = "--tls" in parts
            if "-u" in parts:
                url_index = parts.index("-u") + 1
                value = parts[url_index] if url_index < len(parts) else ""

        if uses_tls and value.startswith("redis://"):
            value = value.replace("redis://", "rediss://", 1)

        return value or None

    @property
    def allowed_origins(self) -> list[str]:
        configured = [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]
        return list(
            dict.fromkeys(
                [
                    self.frontend_url.rstrip("/"),
                    "http://localhost:5173",
                    "http://127.0.0.1:5173",
                    *[origin.rstrip("/") for origin in configured],
                ]
            )
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()
