import json
import os

from dotenv import load_dotenv

from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_groq import ChatGroq

from app.prompts.skill_gap_prompt import SKILL_GAP_PROMPT
from app.services.embedding_service import get_current_db

load_dotenv()

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
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0
)


def analyze_skill_gap(job_description: str):
    """
    Compare Resume with Job Description
    and return AI Skill Gap Analysis.
    """

    # Get currently active vector database
    current_db = get_current_db()

    if current_db is None:
        raise Exception("Please upload a resume first.")

    # Load current resume vector store
    vector_store = Chroma(
        persist_directory=current_db,
        embedding_function=embedding_model
    )

    retriever = vector_store.as_retriever(
        search_kwargs={"k": 8}
    )

    docs = retriever.invoke(
        "Complete Resume"
    )

    resume = "\n\n".join(
        doc.page_content
        for doc in docs
    )

    prompt = f"""
{SKILL_GAP_PROMPT}

Resume

{resume}

Job Description

{job_description}

JSON:
"""

    response = llm.invoke(prompt)

    text = response.content.strip()

    text = text.replace("```json", "")
    text = text.replace("```", "")
    text = text.strip()

    try:
        result = json.loads(text)

    except Exception:
        result = {
            "recommended_role": "",
            "match_score": 0,
            "matched_skills": [],
            "missing_skills": [],
            "learning_path": [],
            "career_advice": []
        }
    del vector_store
    del retriever
    return result