from fastapi import APIRouter, UploadFile, File
import os
import shutil

from app.services.pdf_service import extract_text_from_pdf
from app.services.chunk_service import create_chunks
from app.services.embedding_service import create_vector_store

from app.utils.file_manager import clear_old_data

router = APIRouter()

UPLOAD_FOLDER = "app/uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    """
    Upload Resume
    Delete Previous Resume
    Extract Text
    Create Chunks
    Create Embeddings
    Store into Chroma
    """

    # Delete previous resume and Chroma DB
    clear_old_data()

    # Save uploaded PDF
    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    # Extract text
    documents = extract_text_from_pdf(file_path)

    # Create chunks
    chunks = create_chunks(documents)

    # Create vector database
    create_vector_store(chunks)

    print("\n" + "=" * 70)
    print("AI Resume Analyzer")
    print("=" * 70)
    print(f"Resume : {file.filename}")
    print(f"Pages  : {len(documents)}")
    print(f"Chunks : {len(chunks)}")
    print("Old Resume Deleted Successfully")
    print("Old Chroma Deleted Successfully")
    print("New Resume Indexed Successfully")
    print("=" * 70)

    return {
        "status": "success",
        "message": "Resume uploaded and indexed successfully",
        "filename": file.filename,
        "pages": len(documents),
        "chunks": len(chunks)
    }