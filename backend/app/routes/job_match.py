from fastapi import APIRouter
from pydantic import BaseModel

from app.services.job_match_service import match_resume

router = APIRouter()


class JobRequest(BaseModel):

    job_description: str


@router.post("/job-match")
def job_match(request: JobRequest):

    result = match_resume(
        request.job_description
    )

    return {
        "status": "success",
        "result": result
    }