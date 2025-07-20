# YouTube Chatbot with LangChain RAG (FastAPI + React + Auth0)

## Overview

The YouTube Chatbot RAG Application enables users to input a YouTube video URL, extract and process the transcript using `yt-dlp` and Whisper, and ask questions about the video using a Retrieval-Augmented Generation (RAG) system powered by LangChain. The chatbot returns accurate, timestamped responses grounded in the video content. This web-based application is built using FastAPI for the backend, React for the frontend (with Auth0 authentication), and focuses on modular, scalable architecture completed over a 3-week timeline.

---

## Feature List

### Core Features

1. **YouTube URL Input**:
   - Users can input any valid YouTube URL via the React frontend.
   - Validates public accessibility and transcript availability.

2. **Transcript Extraction**:
   - Automatically extracts transcripts using `yt-dlp` and OpenAI Whisper.
   - Prioritizes English; multilingual support planned.

3. **Transcript Processing**:
   - Cleans transcript (removes `[Music]`, etc.).
   - Segments text using LangChain’s `RecursiveCharacterTextSplitter`.

4. **RAG-Based Q&A**:
   - Uses FAISS or Chroma to search transcript chunks.
   - LangChain pipeline returns natural language answers based on retrieved context.

5. **Timestamp Referencing**:
   - Includes timestamps in answers linking to exact moments in the video.

6. **Auth0 Integration**:
   - Users must log in to access chat features.
   - User sessions and query history are protected.

7. **Error Handling**:
   - Graceful error messaging for invalid videos, missing transcripts, or backend failures.





8. **Multilingual Support**:
   - Optional user language selection and translation using `googletrans` or DeepL.

9. **Transcript Summary**:
   - Generate short summaries of the video using LLMs.

10. **Export Functionality**:
   - Allow users to export transcripts or summaries as `.txt` or `.pdf`.

11. **Mindmap Generation**:
   - Visualize key topics in the transcript using React Flow.

---

## Backend Design

### Technology Stack

- **Language**: Python 3.10+
- **Web Framework**: FastAPI (async REST API)
- **Transcript Extraction**: `yt-dlp`, OpenAI Whisper (local or API)
- **Text Processing**: `re`, `nltk`, LangChain text splitters
- **Embeddings**: `OpenAIEmbeddings` or `sentence-transformers/all-MiniLM-L6-v2`
- **Vector DB**: FAISS or ChromaDB
- **LLM**: OpenAI GPT-3.5/4 or Hugging Face `facebook/bart-large-cnn`
- **Database**: SQLite (for metadata)
- **Auth**: Auth0 JWT validation
- **Containerization**: Docker

### Architecture

1. **Authentication & Access**:
   - Users authenticate via Auth0 (React).
   - FastAPI backend verifies JWT tokens.
   - All key routes (transcript, query, export) are protected.

2. **Transcript Extraction**:
   - FastAPI endpoint `/extract-transcript` takes a YouTube URL.
   - `yt-dlp` downloads audio; Whisper generates transcripts.
   - Metadata (video ID, title, timestamps, user ID) stored in SQLite.

3. **Transcript Processing**:
   - Transcript cleaned using regex and segmented via LangChain’s `RecursiveCharacterTextSplitter`.
   - Chunks are embedded using `sentence-transformers` or OpenAI.

4. **Vector Storage**:
   - Embeddings stored in ChromaDB or FAISS.
   - Indexed for each video per user.

5. **RAG-based Q&A**:
   - `/query` endpoint retrieves top-k relevant transcript chunks.
   - LangChain pipeline uses `ConversationalRetrievalChain` to generate answers with source timestamps.

6. **Chapters & Mindmap**:
   - `/chapters`: Extracts topic-wise video segmentation.
   - `/mindmap`: Returns structured JSON for React-based visual mind mapping.

7. **Export & Utility**:
   - `/export/pdf` and `/export/txt`: Allows users to download transcript/summary.
   - Logs errors and handles failures with friendly responses.



---

## Frontend Design

### Technology Stack

- **Framework**: React.js
- **Authentication**: Auth0 (via `@auth0/auth0-react`)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Mind Map**: React Flow (for optional visualization)
- **Deployment**: Served via FastAPI’s static folder or standalone on Vercel/Netlify

### UI Components

1. **Authentication Flow**:
   - Auth0 login/logout
   - Token included in each Axios request

2. **URL Input Form**:
   - YouTube URL input
   - Submit triggers transcript extraction

3. **Question Input & Chat UI**:
   - Input field to ask natural language questions
   - Chat-style display of answer and source timestamps

4. **Results & Summary Display**:
   - Shows full transcript or summary
   - Timestamped links jump directly to YouTube video segments

5. **Optional Mind Map View**:
   - Graphical layout of major ideas using `react-flow`

### Design Principles

- **Simplicity**: Clean UI focused on interaction
- **Security**: All routes authenticated
- **Responsiveness**: Mobile-first with Tailwind
- **User Feedback**: Spinners, toasts, status indicators

---

## Development Timeline (3 Weeks)

### Week 1 (July 14–July 20, 2025): Transcript Pipeline

- Set up monorepo and folder structure
- Implement `yt-dlp` + Whisper transcript extraction
- Clean, segment, and store transcripts
- Store video metadata (title, ID) in SQLite

 Deliverables:
- Working `/extract-transcript` endpoint
- Transcript files parsed and processed

---

### Week 2 (July 21–July 27, 2025): RAG Pipeline & Frontend Integration

- Setup FAISS/Chroma + embedding logic
- Build LangChain chains: `qa_chain.py`, `summarize_chain.py`
- Integrate `/query`, `/chapters` endpoints
- Setup React UI and Auth0
- Connect frontend with backend via Axios

 Deliverables:
- Working Q&A pipeline with chat interface
- Authenticated frontend connected to backend

---

### Week 3 (July 28–August 3, 2025): Final Features & Deployment

- Add mind map and PDF export (stretch)
- UI polish: error handling, loading states
- Dockerize backend
- Serve frontend (optional: Netlify/Vercel + proxy)
- Final testing with diverse YouTube videos

Deliverables:
- Fully functional prototype
- Local or hosted deployment
- Complete documentation

---



---

## Contact

For questions or support, contact:

- GitHub: [@Mahakisore7](https://github.com/Mahakisore7), [@Ashrockzzz2003](https://github.com/Ashrockzzz2003)

A team review will be held on **July 14** to finalize technical details and feature scope.