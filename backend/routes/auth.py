from fastapi import APIRouter, HTTPException
import traceback

from controllers.auth_controller import signup_controller, login_controller
from models.user_model import UserSignup, UserLogin

router = APIRouter()


@router.post("/signup")
async def signup(user: UserSignup):
    try:
        return await signup_controller(user)
    except Exception as e:
        traceback.print_exc()   # <-- terminal me full error print karega
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/login")
async def login(user: UserLogin):
    try:
        return await login_controller(user)
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))