import os
import shutil

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma

CHROMA_DB_PATH = "app/chroma_db"

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


def create_vector_store(chunks):
    """
    Create a new Chroma vector store.
    Delete old database before creating a new one.
    """

    if os.path.exists(CHROMA_DB_PATH):

        try:
            shutil.rmtree(CHROMA_DB_PATH)
        except Exception:
            pass

    os.makedirs(CHROMA_DB_PATH, exist_ok=True)

    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embedding_model,
        persist_directory=CHROMA_DB_PATH
    )

    try:
        vector_store.persist()
    except Exception:
        pass

    print("\n✅ Resume indexed successfully.")

    return vector_store


def get_vector_store():

    if not os.path.exists(CHROMA_DB_PATH):
        return None

    return Chroma(
        persist_directory=CHROMA_DB_PATH,
        embedding_function=embedding_model
    )