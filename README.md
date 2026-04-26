# CliniqAI

CliniqAI is a clean full-stack starter monorepo with a React + Vite + TypeScript frontend and a FastAPI backend.

## Project Structure

```text
CliniqAI/
  frontend/
  backend/
  README.md
  .gitignore
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server runs on the URL printed by Vite, usually `http://localhost:5173`.

## Backend Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The backend API runs at `http://localhost:8000`.

Available endpoints:

- `GET /` returns `CliniqAI API is running`
- `GET /api/health` returns `{ "status": "ok" }`

