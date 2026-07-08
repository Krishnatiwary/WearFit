from fastapi import APIRouter
from models.cloth_model import Cloth
from database.database import db

router = APIRouter()

@router.post("/upload")
def upload_cloth(cloth: Cloth):
    try:
        print("Received:", cloth.model_dump())

        result = db.clothes.insert_one(cloth.model_dump())

        print("Inserted:", result.inserted_id)

        return {
            "message": "Cloth Uploaded Successfully",
            "id": str(result.inserted_id)
        }

    except Exception as e:
        print("ERROR:", repr(e))
        return {
            "error": str(e)
        }