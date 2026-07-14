import json
import os

from dotenv import load_dotenv

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_groq import ChatGroq

from app.prompts.analysis_prompt import ANALYSIS_PROMPT

load_dotenv()

CHROMA_DB_PATH = "app/chroma_db"

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0
)


def analyze_resume():

    if not os.path.exists(CHROMA_DB_PATH):

        return {
            "ats_score": 0,
            "summary": "Please upload a resume first.",
            "skills": [],
            "experience": {},
            "education": [],
            "certifications": [],
            "strengths": [],
            "suggestions": []
        }

    vector_store = Chroma(
        persist_directory=CHROMA_DB_PATH,
        embedding_function=embedding_model
    )

    retriever = vector_store.as_retriever(
        search_kwargs={"k": 8}
    )

    docs = retriever.invoke(
        "Complete resume including skills, education, projects, certifications and work experience."
    )

    context = "\n\n".join(
        doc.page_content
        for doc in docs
    )

    prompt = ANALYSIS_PROMPT + f"""

Resume

{context}

JSON:
"""

    response = llm.invoke(prompt)

    text = response.content.strip()

    text = text.replace("```json", "")
    text = text.replace("```", "")
    text = text.strip()

    try:
        return json.loads(text)

    except Exception:

        return {
            "ats_score": 0,
            "summary": text,
            "skills": [],
            "experience": {},
            "education": [],
            "certifications": [],
            "strengths": [],
            "suggestions": []
        }