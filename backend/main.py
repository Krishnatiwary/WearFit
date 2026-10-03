from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os

from database.database import db
from routes.upload import router as upload_router
from routes.auth import router as auth_router
from routes.profile import router as profile_router
from notifications import get_daily_outfit_message

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = FastAPI(title="WearFit API")

# ==========================
# CORS
# ==========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://wear-fit-opal.vercel.app",
        "https://wear-a1cekp7xc-krishnatiwarys-projects.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# Serve uploaded images
# ==========================
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads",
)

# ==========================
# Routers
# ==========================
app.include_router(upload_router)
app.include_router(auth_router)
app.include_router(profile_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to WearFit Backend 🚀"
    }


@app.get("/notifications/daily")
def daily_notification():
    return get_daily_outfit_message()