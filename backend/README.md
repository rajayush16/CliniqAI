# CliniqAI Backend

FastAPI service for authenticated medical Q&A over trusted literature sources.

## Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

By default the app uses local SQLite for development if `DATABASE_URL` is empty. Set a PostgreSQL URL in production.

## API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/questions/ask`
- `GET /api/questions/history`
- `GET /api/questions/{id}`
- `DELETE /api/questions/{id}`
- `POST /api/papers/save`
- `GET /api/papers/saved`
- `DELETE /api/papers/{id}`
- `GET /api/health`

