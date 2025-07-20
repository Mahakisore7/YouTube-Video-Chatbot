# retriever/vector_store.py

import chromadb
from chromadb.utils.embedding_functions import DefaultEmbeddingFunction
from langchain_core.documents import Document

class ChromaVectorStore:
    def __init__(self, collection_name="youtube_transcripts"):
        self.client = chromadb.Client()
        self.collection = self.client.get_or_create_collection(
            name=collection_name,
            embedding_function=DefaultEmbeddingFunction()  # not used if custom embeddings passed manually
        )

    def add_documents(self, documents: list[Document], embeddings: list[list[float]]):
        self.collection.add(
            documents=[doc.page_content for doc in documents],
            embeddings=embeddings,
            ids=[f"{doc.metadata['video_id']}_{i}" for i, doc in enumerate(documents)],
            metadatas=[doc.metadata for doc in documents]
        )

    def query(self, query_embedding: list[float], top_k=5):
        results = self.collection.query(query_embeddings=[query_embedding], n_results=top_k)
        return results

def get_vector_store():
    return ChromaVectorStore()