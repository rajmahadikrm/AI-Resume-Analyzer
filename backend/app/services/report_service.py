from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
import os

REPORT_FOLDER = "app/reports"

os.makedirs(REPORT_FOLDER, exist_ok=True)


def generate_report(data):

    filename = "resume_report.pdf"

    file_path = os.path.join(
        REPORT_FOLDER,
        filename
    )

    styles = getSampleStyleSheet()

    doc = SimpleDocTemplate(file_path)

    story = []

    story.append(
        Paragraph(
            "<b>AI Resume Analyzer Report</b>",
            styles["Title"]
        )
    )

    story.append(
        Paragraph(
            f"<b>ATS Score:</b> {data.get('ats_score',0)}",
            styles["BodyText"]
        )
    )

    story.append(
        Paragraph(
            "<br/><b>Summary</b>",
            styles["Heading2"]
        )
    )

    story.append(
        Paragraph(
            data.get("summary",""),
            styles["BodyText"]
        )
    )

    story.append(
        Paragraph(
            "<br/><b>Skills</b>",
            styles["Heading2"]
        )
    )

    for skill in data.get("skills",[]):

        story.append(

            Paragraph(

                "• "+skill,

                styles["BodyText"]

            )

        )

    story.append(

        Paragraph(

            "<br/><b>Suggestions</b>",

            styles["Heading2"]

        )

    )

    for item in data.get("suggestions",[]):

        story.append(

            Paragraph(

                "• "+item,

                styles["BodyText"]

            )

        )

    doc.build(story)

    return file_path