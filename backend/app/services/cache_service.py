import json
from hashlib import sha256
from typing import Any

import redis.asyncio as redis

from app.config import get_settings


class CacheService:
    def __init__(self) -> None:
        settings = get_settings()
        self._memory: dict[str, dict[str, Any]] = {}
        self._redis = redis.from_url(settings.redis_url) if settings.redis_url else None

    def cache_key(self, user_id: int, query: str, filters: dict[str, Any]) -> str:
        raw = json.dumps({"user_id": user_id, "query": query.lower().strip(), "filters": filters}, sort_keys=True)
        return f"question:{sha256(raw.encode()).hexdigest()}"

    async def get(self, key: str) -> dict[str, Any] | None:
        if self._redis:
            try:
                cached = await self._redis.get(key)
                return json.loads(cached) if cached else None
            except Exception:
                return self._memory.get(key)
        return self._memory.get(key)

    async def set(self, key: str, value: dict[str, Any], ttl_seconds: int = 60 * 60 * 12) -> None:
        self._memory[key] = value
        if self._redis:
            try:
                await self._redis.setex(key, ttl_seconds, json.dumps(value, default=str))
            except Exception:
                pass


cache_service = CacheService()

