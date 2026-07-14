import os

from dotenv import load_dotenv

from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_groq import ChatGroq

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

load_dotenv()

CHROMA_DB_PATH = "app/chroma_db"

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

Answer ONLY using the information present
inside the uploaded resume.

Rules:

1. Never make up information.

2. If the answer is not available in the resume,
reply exactly:

"I could not find that information in the uploaded resume."

3. Keep answers professional.

4. If possible, answer using bullet points.

Resume Context:
{context}

Question:
{question}

Answer:
"""
)


def ask_resume(question: str):

    if not os.path.exists(CHROMA_DB_PATH):

        return "Please upload a resume first."

    vector_store = Chroma(
        persist_directory=CHROMA_DB_PATH,
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

    return answer