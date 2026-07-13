import os

from dotenv import load_dotenv

from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_groq import ChatGroq

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

from app.services.embedding_service import get_current_db

load_dotenv()

# -----------------------------
# API KEY
# -----------------------------
groq_api_key = os.getenv("GROQ_API_KEY")

# -----------------------------
# Embedding Model
# -----------------------------
embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# -----------------------------
# LLM
# -----------------------------
llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=groq_api_key,
    temperature=0
)

# -----------------------------
# Prompt
# -----------------------------
prompt = ChatPromptTemplate.from_template(
"""
You are an expert AI Resume Analyzer.

Answer ONLY from the uploaded resume.

Rules:

1. Never invent information.

2. If information is unavailable reply exactly:

"I could not find that information in the uploaded resume."

3. Keep answers professional.

4. Use bullet points whenever possible.

Resume Context:
{context}

Question:
{question}

Answer:
"""
)


def ask_resume(question: str):

    current_db = get_current_db()

    if current_db is None:

        return "Please upload a resume first."

    vector_store = Chroma(
        persist_directory=current_db,
        embedding_function=embedding_model
    )

    retriever = vector_store.as_retriever(
        search_kwargs={
            "k": 4
        }
    )

    chain = (
        {
            "context": retriever,
            "question": RunnablePassthrough()
        }
        | prompt
        | llm
        | StrOutputParser()
    )

    answer = chain.invoke(question)

    del vector_store
    del retriever

    return answer