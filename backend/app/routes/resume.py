from fastapi import APIRouter, UploadFile, File
import os
import shutil

from app.services.pdf_service import extract_text_from_pdf
from app.services.chunk_service import create_chunks

from app.services.embedding_service import (
    create_vector_store,
    delete_old_vectorstores
)

from app.utils.file_manager import clear_uploads

router = APIRouter()

UPLOAD_FOLDER = "app/uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    """
    Upload Resume
    Create NEW Vector Database
    Make it Active
    Delete Old Vector Databases
    """

    try:

        # Delete previous uploaded PDFs only
        clear_uploads()

        # Save uploaded resume
        file_path = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Extract PDF
        documents = extract_text_from_pdf(file_path)

        # Chunk
        chunks = create_chunks(documents)

        # Create NEW vector database
        current_db = create_vector_store(chunks)

        import gc

        gc.collect()

        delete_old_vectorstores()

        print("\n" + "=" * 70)
        print("AI Resume Analyzer")
        print("=" * 70)
        print(f"Resume       : {file.filename}")
        print(f"Pages        : {len(documents)}")
        print(f"Chunks       : {len(chunks)}")
        print(f"Vector Store : {current_db}")
        print("=" * 70)

        return {
            "status": "success",
            "message": "Resume uploaded successfully",
            "filename": file.filename,
            "pages": len(documents),
            "chunks": len(chunks)
        }

    except Exception as e:

        return {
            "status": "error",
            "message": str(e)
        }