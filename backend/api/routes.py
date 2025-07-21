# /api/routes.py

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from typing import List

from .schemas import (
    TranscriptRequest, TranscriptResponse,
    QueryRequest, AnswerResponse
)
from services.transcript_service import handle_transcript
from services.query_service import handle_query
from auth.dependencies import verify_jwt_token

router = APIRouter()

# 👇 Secured route with Auth0 JWT verification
@router.post("/extract-transcript", response_model=TranscriptResponse)
def extract_transcript(
    request: TranscriptRequest,
    token_data: dict = Depends(verify_jwt_token)
):
    try:
        return handle_transcript(request.youtube_url)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/query", response_model=AnswerResponse)
def query_transcript(
    request: QueryRequest,
    token_data: dict = Depends(verify_jwt_token)
):
    try:
        return handle_query(request.video_id, request.question)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Optional public health endpoint
@router.get("/ping")
def ping():