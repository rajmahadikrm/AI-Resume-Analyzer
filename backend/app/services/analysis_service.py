import json
import os

from dotenv import load_dotenv

from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_groq import ChatGroq

from app.prompts.analysis_prompt import ANALYSIS_PROMPT
from app.services.embedding_service import get_current_db

load_dotenv()

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0
)


def analyze_resume():

    current_db = get_current_db()

    if current_db is None:
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
        persist_directory=current_db,
        embedding_function=embedding_model
    )

    retriever = vector_store.as_retriever(
        search_kwargs={"k": 8}
    )

    docs = retriever.invoke(
        "Complete resume including skills, education, projects, certifications and work experience."
    )

    context = "\n\n".join(
        doc.page_content for doc in docs
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
        del vector_store
        del retriever
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