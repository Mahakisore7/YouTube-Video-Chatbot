# retriever/embedder.py

from sentence_transformers import SentenceTransformer

class SentenceEmbedder:
    def __init__(self, model_name="all-MiniLM-L6-v2"):
        self.model = SentenceTransformer(model_name)

    def embed_documents(self, texts: list[str]) -> list[list[float]]:
        return self.model.encode(texts, show_progress_bar=True, convert_to_numpy=True).tolist()

    def embed_query(self, query: str) -> list[float]:
        return self.model.encode(query, convert_to_numpy=True).tolist()

def get_embedder():
    return SentenceEmbedder()