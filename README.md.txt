# FruitVision AI Application

This project contains the frontend (React) and backend (FastAPI) for the FruitVision AI application.

## Setup

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

### Backend
1. `cd backend`
2. `python -m venv .venv`
3. `source .venv/bin/activate` (or `.venv\Scripts\activate` on Windows)
4. `pip install -r requirements.txt`
5. **AI Models:** [Explain here if users need to download models manually and where to put them in `backend/models_ai/`]
6. `uvicorn app.main:app --reload`