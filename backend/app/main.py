import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.resume import router as resume_router
from app.routes.chat import router as chat_router
from app.routes.analysis import router as analysis_router
from app.routes.job_match import router as job_match_router
from app.routes.report import router as report_router
from app.routes.skill_gap import router as skill_gap_router

# Load environment variables
load_dotenv()

app = FastAPI(
    title="AI Resume Analyzer",
    description="AI-powered Resume Analyzer using FastAPI, LangChain, ChromaDB and Groq",
    version="1.0.0"
)

# --------------------------------------------------
# CORS Configuration
# --------------------------------------------------

origins = [
    "http://localhost:5173",  # Local React/Vite
]

# Add deployed frontend URL if available
frontend_url = os.getenv("FRONTEND_URL")

if frontend_url:
    origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# Register Routes
# --------------------------------------------------

app.include_router(resume_router)
app.include_router(chat_router)
app.include_router(analysis_router)
app.include_router(job_match_router)
app.include_router(report_router)
app.include_router(skill_gap_router)

# --------------------------------------------------
# Root Endpoint
# --------------------------------------------------

@app.get("/", tags=["Health"])
def home():
    return {
        "status": "running",
        "application": "AI Resume Analyzer",
        "version": "1.0.0",
        "message": "Backend is running successfully 🚀"
    }


@app.get("/health", tags=["Health"])
def health():
    return {
        "status": "healthy"
    }