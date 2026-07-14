import os
import shutil
from datetime import datetime
from functools import lru_cache

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma

BASE_CHROMA_PATH = "app/chroma_db"
CURRENT_FILE = "app/current_resume.txt"


@lru_cache(maxsize=1)
def get_embedding_model():
    return HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )


def get_current_db():

    if not os.path.exists(CURRENT_FILE):
        return None

    with open(CURRENT_FILE, "r") as f:
        return f.read().strip()


def set_current_db(db_path):

    with open(CURRENT_FILE, "w") as f:
        f.write(db_path)


def create_vector_store(chunks):

    os.makedirs(BASE_CHROMA_PATH, exist_ok=True)

    db_name = "resume_" + datetime.now().strftime("%Y%m%d_%H%M%S")

    persist_directory = os.path.join(
        BASE_CHROMA_PATH,
        db_name
    )

    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=get_embedding_model(),
        persist_directory=persist_directory
    )

    set_current_db(persist_directory)

    print(f"\n✅ Active Vector DB : {persist_directory}")

    return persist_directory


def get_vector_store():

    current_db = get_current_db()

    if current_db is None:
        return None

    return Chroma(
        persist_directory=current_db,
        embedding_function=get_embedding_model()
    )


def delete_old_vectorstores(keep_latest=True):

    if not os.path.exists(BASE_CHROMA_PATH):
        return

    folders = sorted(os.listdir(BASE_CHROMA_PATH))

    latest = get_current_db()

    for folder in folders:

        full = os.path.join(BASE_CHROMA_PATH, folder)

        if keep_latest and full == latest:
            continue

        try:
            shutil.rmtree(full)
        except Exception:
            pass