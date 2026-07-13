from fastapi import APIRouter
from fastapi.responses import FileResponse

from app.services.analysis_service import analyze_resume
from app.services.report_service import generate_report

router = APIRouter()


@router.get("/report")

def download_report():

    analysis = analyze_resume()

    pdf_path = generate_report(
        analysis
    )

    return FileResponse(
        pdf_path,
        filename="AI_Resume_Report.pdf",
        media_type="application/pdf"
    )