import os
import shutil

UPLOAD_FOLDER = "app/uploads"
CHROMA_DB_PATH = "app/chroma_db"


def clear_uploads():
    """
    Delete all uploaded PDF files.
    """

    if not os.path.exists(UPLOAD_FOLDER):
        return

    for file in os.listdir(UPLOAD_FOLDER):

        file_path = os.path.join(UPLOAD_FOLDER, file)

        try:

            if os.path.isfile(file_path):
                os.remove(file_path)

        except Exception as e:

            print(f"Could not delete {file_path}: {e}")


def clear_chroma():
    """
    Delete old Chroma database.
    """

    if not os.path.exists(CHROMA_DB_PATH):
        return

    try:

        shutil.rmtree(CHROMA_DB_PATH)

    except Exception as e:

        print(f"Could not delete Chroma DB: {e}")


def clear_old_data():
    """
    Delete uploaded PDFs and Chroma database.
    """

    clear_uploads()
    clear_chroma()