import json
import os

from dotenv import load_dotenv

from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_groq import ChatGroq

from app.prompts.skill_gap_prompt import SKILL_GAP_PROMPT

load_dotenv()

CHROMA_DB_PATH = "app/chroma_db"

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

    if not os.path.exists(CHROMA_DB_PATH):
        raise Exception("Please upload a resume first.")

    vector_store = Chroma(
        persist_directory=CHROMA_DB_PATH,
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
        return json.loads(text)

    except Exception:

        return {
            "recommended_role": "",
            "match_score": 0,
            "matched_skills": [],
            "missing_skills": [],
            "learning_path": [],
            "career_advice": []
        }