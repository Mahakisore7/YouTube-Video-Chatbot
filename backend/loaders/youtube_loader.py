from backend.retriever.embedder import get_embedder
from backend.retriever.vector_store import get_vector_store
from langchain_core.documents import Document
from urllib.parse import urlparse, parse_qs
import os
import yt_dlp
import uuid
from whisper import load_model
import re

AUDIO_DIR = "temp_audio"

def download_audio(youtube_url: str) -> tuple[str, str]:
    os.makedirs(AUDIO_DIR, exist_ok=True)
    file_id = str(uuid.uuid4())
    output_path = os.path.join(AUDIO_DIR, f"{file_id}.%(ext)s")
    
    ydl_opts = {
        'format': 'bestaudio/best',
        'extractaudio': True,
        'audioformat': 'mp3',
        'outtmpl': output_path,
        'noplaylist': True,
        'quiet': True,
        'no_warnings': True,
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'forcejson': True,
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(youtube_url, download=True)
    
    actual_path = os.path.join(AUDIO_DIR, f"{file_id}.mp3")
    return actual_path, info.get("title", "Unknown Title")
    

def transcribe_audio(file_path: str, model_size: str = "base") -> dict:
    model = load_model(model_size)
    try:
        result = model.transcribe(file_path)
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)
    return result


def load_youtube_transcript(url: str, model_size="base"):
    audio_path, title = download_audio(url)
    result = transcribe_audio(audio_path, model_size)




    segments = result.get("segments", [])
    language = result.get("language", "en")
    transcript_texts = [seg["text"] for seg in segments]


    embedder = get_embedder()
    embeddings = embedder.embed_documents(transcript_texts)



    video_id = extract_video_id(url)

    documents = [
        Document(page_content=seg["text"], metadata={"video_id": video_id, "start": seg["start"]})
        for seg in segments
    ]



    vector_store = get_vector_store()
    vector_store.add_documents(documents, embeddings)

    return {
        "video_id": video_id,
        "title": title,
        "language": language,
        "chunks": len(segments),
    }


def extract_video_id(url: str) -> str:

    if "shorts/" in url:
        return url.split("shorts/")[-1].split("?")[0]
    parsed_url = urlparse(url)
    query = parse_qs(parsed_url.query)
    return query.get("v", ["unknown"])[0]
