from fastapi import Header, HTTPException
from jose import jwt

SECRET_KEY = "wearfit_secret_key"
ALGORITHM = "HS256"


def get_current_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization token missing"
        )

    try:
        token = authorization.replace("Bearer ", "")

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = payload.get("id")

        if not user_id:
            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

        return user_id

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )