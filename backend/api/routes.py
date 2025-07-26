# backend/api/routes.py

from fastapi import APIRouter, HTTPException
from backend.api.schemas import TranscriptRequest, TranscriptResponse
from backend.loaders.youtube_loader import load_youtube_transcript  # Assuming you have this function

router = APIRouter()

@router.post("/transcript", response_model=TranscriptResponse)
def get_transcript(request: TranscriptRequest):
    try:
        transcript_data = load_youtube_transcript(request.youtube_url)
        return transcript_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
