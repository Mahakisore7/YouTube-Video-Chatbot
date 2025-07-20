# services/transcript_service.py

from loaders.youtube_loader import extract_transcript
from utils.text_splitter import get_text_splitter
from retriever.embedder import get_embedder
from retriever.vector_store import get_vector_store
from langchain_core.documents import Document
import re

class TranscriptService:
    def __init__(self):
        self.splitter = get_text_splitter()
        self.embedder = get_embedder()
        self.vector_store = get_vector_store()

    def clean_transcript(self, raw_text: str) -> str:
        # Remove noise like [Music], timestamps, extra spaces
        cleaned = re.sub(r"\[(.*?)\]", "", raw_text)           # Remove tags like [Music]
        cleaned = re.sub(r"\n+", " ", cleaned)                 # Remove newlines
        cleaned = re.sub(r"\s{2,}", " ", cleaned).strip()      # Remove extra spaces
        return cleaned

    def process_video(self, youtube_url: str, video_id: str) -> dict:
        print(f"📥 Extracting transcript from: {youtube_url}")
        raw_transcript, language = extract_transcript(youtube_url)

        print(f"🧹 Cleaning transcript")
        cleaned_text = self.clean_transcript(raw_transcript)

        print(f"✂️ Splitting into chunks")
        chunks = self.splitter.split_text(cleaned_text)

        print(f"📄 Creating Document objects")
        documents = [Document(page_content=chunk, metadata={"video_id": video_id}) for chunk in chunks]

        print(f"🔎 Generating embeddings")
        embeddings = self.embedder.embed_documents([doc.page_content for doc in documents])

        print(f"📦 Storing in vector DB (ChromaDB)")
        self.vector_store.add_documents(documents, embeddings)

        return {
            "status": "success",
            "chunks_stored": len(chunks),
            "language": language
        }