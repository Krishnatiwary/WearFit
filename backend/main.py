from fastapi import FastAPI
from database.database import db
from routes.upload import router as upload_router

app = FastAPI(title="WearFit API")

app.include_router(upload_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to WearFit Backend 🚀"
    }