import os

UPLOAD_FOLDER = "app/uploads"


def clear_uploads():
    """
    Delete previously uploaded PDF files.
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


def clear_old_data():
    """
    Delete uploaded PDFs only.

    We do NOT delete the Chroma database directory because
    Windows may lock database files while Chroma is running.
    """

    clear_uploads()