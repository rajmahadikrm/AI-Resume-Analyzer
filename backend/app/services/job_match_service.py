import json
import os

from dotenv import load_dotenv

from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_groq import ChatGroq

from app.prompts.job_match_prompt import JOB_MATCH_PROMPT
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



def match_resume(job_description: str):

    current_db = get_current_db()
    if current_db is None:
        raise Exception("Please upload a resume first.")

    vector_store = Chroma(
    persist_directory=current_db,
    embedding_function=embedding_model
    )

    retriever = vector_store.as_retriever(
        search_kwargs={
            "k": 8
        }
    )

    docs = retriever.invoke(
        "Complete Resume"
    )

    resume = "\n\n".join(
        doc.page_content
        for doc in docs
    )

    prompt = JOB_MATCH_PROMPT + f"""

Resume

{resume}


Job Description

{job_description}

JSON:
"""

    response = llm.invoke(prompt)

    text = response.content

    text = text.replace("```json", "")
    text = text.replace("```", "")
    del vector_store
    del retriever
    return json.loads(text)