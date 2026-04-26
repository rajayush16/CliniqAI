# CliniqAI

CliniqAI is a full-stack medical evidence Q&A app for doctors. It searches trusted medical literature sources, ranks retrieved papers, and returns concise cited answers with confidence and safety notes.

## Project Structure

```text
CliniqAI/
  frontend/
  backend/
  README.md
  .gitignore
```

## Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS, React Router, TanStack Query, Framer Motion, Lucide icons, ShadCN-style components
- Backend: FastAPI, SQLAlchemy, PostgreSQL-ready models, Redis-ready caching, JWT auth, bcrypt password hashing, Pydantic validation
- Sources: PubMed NCBI E-utilities and Europe PMC

## Frontend Setup

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

The frontend dev server runs on the URL printed by Vite, usually `http://localhost:5173`.

## Backend Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload
```

The backend API runs at `http://localhost:8000`.

For local development, the backend falls back to SQLite if `DATABASE_URL` is not set. Use PostgreSQL and Redis URLs in production.

## Environment Variables

Backend:

```text
DATABASE_URL=
REDIS_URL=
JWT_SECRET=
OPENAI_API_KEY=
NCBI_API_KEY=
FRONTEND_URL=http://localhost:5173
```

Frontend:

```text
VITE_API_BASE_URL=http://localhost:8000
```

## API Overview

- `GET /` returns `CliniqAI API is running`
- `GET /api/health` returns `{ "status": "ok" }`
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

## Guardrails

CliniqAI only uses retrieved PubMed and Europe PMC source data for answers. If reliable evidence is missing, it returns: `Not enough reliable evidence found.`
