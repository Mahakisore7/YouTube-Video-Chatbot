import os 
import subprocess
import uuid
from whisper import load_model,transcibe 


AUDIO_DIR = "temp_audio"


def download_audio(yotube_url: str) -> str:

    os.makedirs(AUDIO_DIR,exist_ok=True)
    file_id = str(uuid.uuid4())
    output_path = os.path.join(AUDIO_DIR,f"{file_id}.mp3")


    command = [
        "yt-dlp",
        "-f","bestaudio",
        "--extract-audio",
        "--audio-format","mp3"
        "-o",output_path,
        yotube_url
    ]


    subprocess.run(command,check=True)
    return output_path



def transcribe_audio(file_path: str, model_size: str = "base") -> dict:
    
    model = load_model(model_size)
    try:
        result = model.transcribe(file_path)
    finally:
        # Always delete the file whether transcription succeeds or fails
        if os.path.exists(file_path):
            os.remove(file_path)
    return result



def extract_transcript_from_youtube(url: str, model_size: str = "base") -> dict:
    
    try:
        audio_path = download_audio(url)
        result = transcribe_audio(audio_path, model_size)
        return {
            "text": result["text"],
            "segments": result.get("segments", []),
            "language": result.get("language", "en")
        }
    except Exception as e:
        raise RuntimeError(f"Transcript extraction failed: {str(e)}")