from fastapi import FastAPI

app = FastAPI(title="CliniqAI API")


@app.get("/")
def read_root() -> str:
    return "CliniqAI API is running"


@app.get("/api/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}

