from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


from config import settings
from api.routes import routes api_routes


app = FastAPI(
    title="Youtube Transcript RAG API",
    description="Backend for RAG-powered Youtube Q&A System",
    version="1.0.0"
)


app.add_middleware(
    
)