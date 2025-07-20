# backend/config.py

from pydantic import BaseSettings

class Settings(BaseSettings):
    OPENAI_API_KEY: str = ""
    WHISPER_MODEL: str = "base"
    VECTOR_DB_TYPE: str = "chroma"
    CHROMA_PERSIST_DIR: str = "./chroma_store"
    DATABASE_URL: str = "sqlite:///./transcripts.db"
    AUTH0_DOMAIN: str = ""
    AUTH0_API_AUDIENCE: str = ""
    AUTH0_ALGORITHMS: str = "RS256"

    class Config:
        env_file = ".env"

settings = Settings()