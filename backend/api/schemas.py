# /api/schemas.py

from pydantic import BaseModel
from typing import List, Optional

class TranscriptRequest(BaseModel):
    youtube_url: str

class TranscriptResponse(BaseModel):
    video_id: str
    title: str
    language: str
    chunks: int

class QueryRequest(BaseModel):
    video_id: str
    question: str

class AnswerResponse(BaseModel):
    answer: str
    sources: List[str]  # List of timestamps or text snippets

class ErrorResponse(BaseModel):
    detail: str