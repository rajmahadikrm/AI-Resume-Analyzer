from fastapi import APIRouter
from app.services.analysis_service import analyze_resume

router = APIRouter()


@router.post("/analyze")
def analyze():

    """
    Analyze the uploaded resume and return
    ATS score, summary, skills, education,
    experience, certifications and suggestions.
    """

    try:

        result = analyze_resume()

        return {
            "status": "success",
            "analysis": result
        }

    except Exception as e:

        return {
            "status": "error",
            "message": str(e)
        }