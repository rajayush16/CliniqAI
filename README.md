# CliniqAI

CliniqAI is a full-stack medical evidence assistant for clinicians. It accepts clinical questions, retrieves literature from PubMed and Europe PMC, ranks the returned papers, and generates concise evidence-based answers with citations, confidence labels, and source details.

The application is designed as a doctor-facing research workflow, not as a patient diagnosis or treatment system. Answers are grounded in retrieved literature snippets and should be reviewed by qualified medical professionals before clinical use.

## Features

- Authenticated clinician accounts with JWT-based sessions
- Medical question answering backed by PubMed and Europe PMC retrieval
- Evidence filters for recent papers, last five years, reviews, and clinical trials
- Source ranking across retrieved papers with citation metadata
- LLM-generated answer summaries using only retrieved source snippets
- Fallback answer generation when an LLM provider is not configured
- Question history with response time, confidence, sources, and cached results
- Saved paper library for keeping useful references
- Redis-backed response caching with in-memory fallback
- SQLite development database with PostgreSQL-compatible production configuration
- Responsive React interface with dashboard, question flow, history, saved papers, settings, and theme support

## Tech Stack

### Frontend

- React 19
- Vite 7
- TypeScript
- React Router 7
- TanStack Query
- Tailwind CSS 4
- Framer Motion
- Lucide React icons

### Backend

- FastAPI
- SQLAlchemy 2
- Pydantic Settings
- SQLite for local development
- PostgreSQL via `psycopg` for production
- Redis for optional distributed caching
- JWT authentication with `python-jose`
- Bcrypt password hashing
- HTTPX for external API calls

### External Services

- PubMed / NCBI E-utilities
- Europe PMC REST API
- Optional LLM providers:
  - OpenRouter
  - OpenAI
  - Groq

## Project Structure

```text
CliniqAI/
  backend/
    app/
      routes/          FastAPI route modules
      services/        RAG, LLM, literature search, auth, and cache services
      models/          SQLAlchemy database models
      schemas/         Pydantic request and response schemas
      utils/           Ranking, citation, and security helpers
      main.py          FastAPI application entry point
      config.py        Environment-driven settings
      database.py      SQLAlchemy engine/session setup
    requirements.txt
    README.md
  frontend/
    public/            Static assets and logos
    src/
      app/             App shell and router
      components/      UI, layout, landing, and shared components
      hooks/           Auth, theme, and question hooks
      pages/           Route-level screens
      services/        API client modules
      styles/          Global styles
      types/           Shared TypeScript types
    package.json
    vite.config.ts
    README.md
  README.md
```

## How It Works

1. A clinician signs up or logs in to receive a bearer token.
2. The user submits a medical question with optional evidence filters.
3. The backend rewrites the query into a clinical evidence search phrase.
4. PubMed and Europe PMC are queried in parallel.
5. Retrieved papers are normalized into a shared source format.
6. Sources are ranked and limited by relevance.
7. The selected evidence is sent to the configured LLM provider.
8. The answer is returned with key findings, confidence, citations, response time, and cache status.
9. The question and evidence metadata are stored in the database for future history lookup.

If no LLM provider key is configured, the backend still returns a cautious citation-based fallback summary from retrieved literature.

## Prerequisites

- Node.js 20 or newer
- npm
- Python 3.11 or newer
- Optional: PostgreSQL for production-like persistence
- Optional: Redis for shared caching
- Optional: API key for OpenRouter, OpenAI, or Groq
- Optional: NCBI API key for higher PubMed request limits

## Backend Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The backend runs at:

```text
http://localhost:8000
```

FastAPI documentation is available at:

```text
http://localhost:8000/docs
```

By default, the backend uses a local SQLite database file named `cliniqai.db` if `DATABASE_URL` is not provided.

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The Vite development server usually runs at:

```text
http://localhost:5173
```

The frontend reads the backend URL from `VITE_API_BASE_URL` and defaults to `http://localhost:8000`.

## Environment Variables

Create environment files as needed for your local setup.

### Backend `.env`

```env
DATABASE_URL=sqlite:///./cliniqai.db
REDIS_URL=
JWT_SECRET=replace-with-a-secure-secret
FRONTEND_URL=http://localhost:5173
CORS_ORIGINS=

LLM_PROVIDER=openrouter
LLM_MODEL=openrouter/free
OPENROUTER_API_KEY=
OPENAI_API_KEY=
GROQ_API_KEY=

NCBI_API_KEY=
```

### Frontend `.env`

```env
VITE_API_BASE_URL=http://localhost:8000
```

## LLM Provider Configuration

The backend supports three chat-completion-compatible providers:

| Provider | `LLM_PROVIDER` value | Required key |
| --- | --- | --- |
| OpenRouter | `openrouter` | `OPENROUTER_API_KEY` |
| OpenAI | `openai` | `OPENAI_API_KEY` |
| Groq | `groq` | `GROQ_API_KEY` |

`LLM_MODEL` should be set to a model available from the selected provider. If no matching provider key is present, CliniqAI uses its internal fallback summary logic.

## API Overview

### System

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Basic API status message |
| `GET` | `/api/health` | Health check |

### Auth

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create a user account and return a bearer token |
| `POST` | `/api/auth/login` | Authenticate and return a bearer token |
| `GET` | `/api/auth/me` | Return the authenticated user profile |

### Questions

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/questions/ask` | Ask a medical question and retrieve a cited answer |
| `GET` | `/api/questions/history` | Return recent question history for the current user |
| `GET` | `/api/questions/{question_id}` | Return one question record |
| `DELETE` | `/api/questions/{question_id}` | Delete one question record |

### Saved Papers

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/papers/save` | Save a paper to the current user's library |
| `GET` | `/api/papers/saved` | List saved papers |
| `DELETE` | `/api/papers/{paper_id}` | Delete a saved paper |

Authenticated endpoints require:

```text
Authorization: Bearer <access_token>
```

## Question Request Example

```json
{
  "query": "What is the evidence for SGLT2 inhibitors in heart failure with preserved ejection fraction?",
  "filters": {
    "recent_only": false,
    "last_five_years": true,
    "review_only": false,
    "clinical_trials_only": true
  }
}
```

## Question Response Shape

```json
{
  "id": 1,
  "query": "What is the evidence for SGLT2 inhibitors in heart failure with preserved ejection fraction?",
  "answer": "Evidence-grounded answer text with citations.",
  "confidence": "Medium",
  "evidence_strength": "Medium",
  "key_findings": ["Finding one", "Finding two"],
  "citations": [
    {
      "title": "Paper title",
      "authors": "Author list",
      "journal": "Journal name",
      "year": "2024",
      "pmid": "12345678",
      "doi": "10.xxxx/example",
      "source": "PubMed",
      "source_url": "https://pubmed.ncbi.nlm.nih.gov/12345678/",
      "abstract": "Abstract text",
      "score": 4.5
    }
  ],
  "response_time_ms": 2400,
  "cached": false,
  "created_at": "2026-04-28T10:00:00Z"
}
```

## Available Frontend Routes

| Route | Description |
| --- | --- |
| `/` | Landing page |
| `/login` | Login page |
| `/signup` | Account creation |
| `/app` | Authenticated dashboard |
| `/app/ask` | Medical question form |
| `/app/answers/:id` | Answer result view |
| `/app/history` | Question history |
| `/app/saved-papers` | Saved paper library |
| `/app/settings` | User settings |

## Development Commands

### Backend

```bash
cd backend
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm run dev
npm run build
npm run preview
```

## Production Notes

- Set a strong `JWT_SECRET`.
- Use PostgreSQL instead of local SQLite for persistent production data.
- Configure `REDIS_URL` for shared cache storage across multiple backend instances.
- Set `FRONTEND_URL` and `CORS_ORIGINS` to the deployed frontend origins.
- Store provider keys in a secret manager or deployment environment, not in source control.
- Review rate limits and terms for PubMed, Europe PMC, and the selected LLM provider.
- Add deployment-level logging, monitoring, HTTPS, and backup policies before handling real clinical workflows.

## Medical Safety Notice

CliniqAI is an evidence retrieval and summarization tool. It does not replace clinical judgment, medical training, local guidelines, or patient-specific assessment. Generated answers may be incomplete, uncertain, or affected by source retrieval quality. Clinicians should verify cited papers and apply independent judgment before making decisions.

## License

No license file is currently included in this repository. Add a license before distributing or publishing the project.
