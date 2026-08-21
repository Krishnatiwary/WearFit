from fastapi import APIRouter, UploadFile, File, Form
from typing import Optional
import os
import shutil
from uuid import uuid4
from bson import ObjectId
from database.database import cloth_collection

print("✅ upload.py loaded")

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# ==========================
# Upload Cloth
# ==========================
@router.post("/upload")
async def upload_cloth(
    file: UploadFile = File(...),
    name: str = Form(...),
    category: str = Form(...),
    color: str = Form(...),
    season: str = Form(...),
    brand: str = Form(...),
    occasion: str = Form(...)
):
    filename = f"{uuid4()}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    cloth_data = {
        "name": name,
        "image": filename,
        "category": category,
        "color": color,
        "season": season,
        "brand": brand,
        "occasion": occasion,
    }

    result = cloth_collection.insert_one(cloth_data)

    cloth_data["_id"] = str(result.inserted_id)

    return {
        "success": True,
        "message": "Image uploaded successfully",
        "data": cloth_data
    }


# ==========================
# Get All Clothes
# ==========================
@router.get("/clothes")
async def get_clothes():

    clothes = []

    for cloth in cloth_collection.find():
        cloth["_id"] = str(cloth["_id"])
        clothes.append(cloth)

    return {
        "success": True,
        "count": len(clothes),
        "data": clothes
    }


# ==========================
# Get Single Cloth
# ==========================
@router.get("/cloth/{cloth_id}")
async def get_single_cloth(cloth_id: str):

    try:
        cloth = cloth_collection.find_one({"_id": ObjectId(cloth_id)})

        if not cloth:
            return {
                "success": False,
                "message": "Cloth not found"
            }

        cloth["_id"] = str(cloth["_id"])

        return {
            "success": True,
            "data": cloth
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


# ==========================
# Delete Cloth
# ==========================
@router.delete("/cloth/{cloth_id}")
async def delete_cloth(cloth_id: str):

    try:
        cloth = cloth_collection.find_one({"_id": ObjectId(cloth_id)})

        if not cloth:
            return {
                "success": False,
                "message": "Cloth not found"
            }

        if "image" in cloth:
            image_path = os.path.join(UPLOAD_DIR, cloth["image"])

            if os.path.exists(image_path):
                os.remove(image_path)

        result = cloth_collection.delete_one({"_id": ObjectId(cloth_id)})

        if result.deleted_count == 0:
            return {
                "success": False,
                "message": "Delete failed"
            }

        return {
            "success": True,
            "message": "Cloth deleted successfully"
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


# ==========================
# Update Cloth
# ==========================
# ==========================
# Update Cloth
# ==========================
@router.put("/cloth/{cloth_id}")
async def update_cloth(
    cloth_id: str,
    name: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    color: Optional[str] = Form(None),
    season: Optional[str] = Form(None),
    brand: Optional[str] = Form(None),
    occasion: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None)
):
    try:

        cloth = cloth_collection.find_one(
            {"_id": ObjectId(cloth_id)}
        )

        if not cloth:
            return {
                "success": False,
                "message": "Cloth not found"
            }

        updated_data = {}

        if name is not None:
            updated_data["name"] = name

        if category is not None:
            updated_data["category"] = category

        if color is not None:
            updated_data["color"] = color

        if season is not None:
            updated_data["season"] = season

        if brand is not None:
            updated_data["brand"] = brand

        if occasion is not None:
            updated_data["occasion"] = occasion

        # New image
        if file:

            if "image" in cloth:
                old_image = os.path.join(
                    UPLOAD_DIR,
                    cloth["image"]
                )

                if os.path.exists(old_image):
                    os.remove(old_image)

            filename = f"{uuid4()}_{file.filename}"
            file_path = os.path.join(
                UPLOAD_DIR,
                filename
            )

            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(
                    file.file,
                    buffer
                )

            updated_data["image"] = filename

        print("================================")
        print("UPDATED DATA:", updated_data)
        print("OCCASION:", occasion)
        print("================================")

        result = cloth_collection.update_one(
            {"_id": ObjectId(cloth_id)},
            {"$set": updated_data}
        )

        print("MODIFIED COUNT:", result.modified_count)

        return {
            "success": True,
            "message": "Cloth updated successfully",
            "data": updated_data
        }

    except Exception as e:

        print("UPDATE ERROR:", e)

        return {
            "success": False,
            "error": str(e)
        }


# ==========================
# Dashboard Stats
# ==========================
@router.get("/dashboard/stats")
async def dashboard_stats():

    total_clothes = cloth_collection.count_documents({})

    shirts = cloth_collection.count_documents({
        "category": {"$regex": "^shirt$", "$options": "i"}
    })

    tshirts = cloth_collection.count_documents({
        "category": {"$regex": "^tshirt$", "$options": "i"}
    })

    pants = cloth_collection.count_documents({
        "category": {"$regex": "^pant$", "$options": "i"}
    })

    return {
        "success": True,
        "data": {
            "total": total_clothes,
            "shirts": shirts,
            "tshirts": tshirts,
            "pants": pants
        }
    }