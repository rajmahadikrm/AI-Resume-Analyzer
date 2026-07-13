from fastapi import APIRouter
from pydantic import BaseModel

from app.services.skill_gap_service import analyze_skill_gap

router = APIRouter()


class SkillGapRequest(BaseModel):
    job_description: str


@router.post("/skill-gap")
def skill_gap(request: SkillGapRequest):
    """
    Analyze Resume vs Job Description
    and return:
    - Match Score
    - Missing Skills
    - Learning Roadmap
    - Career Advice
    """

    try:

        result = analyze_skill_gap(
            request.job_description
        )

        return {
            "status": "success",
            "result": result
        }

    except Exception as e:

        return {
            "status": "error",
            "message": str(e)
        }