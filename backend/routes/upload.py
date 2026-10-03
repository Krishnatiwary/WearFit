from fastapi import APIRouter, UploadFile, File, Form, Depends
from typing import Optional
import os
import shutil
from uuid import uuid4
from bson import ObjectId

import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv

from database.database import cloth_collection
from utils.auth_dependency import get_current_user


# ==========================
# Load Environment Variables
# ==========================
load_dotenv()


# ==========================
# Cloudinary Configuration
# ==========================
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)


print("✅ upload.py loaded")
print("✅ Cloudinary configured")


router = APIRouter()


# ==========================
# Legacy Local Uploads
# ==========================
# Old images already present in your local uploads folder
# are kept working for existing records.
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# ==========================
# Upload Cloth
# ==========================
@router.post("/upload")
async def upload_cloth(
    file: UploadFile = File(...),
    user_id: str = Depends(get_current_user),
    name: str = Form(...),
    category: str = Form(...),
    color: str = Form(...),
    season: str = Form(...),
    brand: str = Form(...),
    occasion: str = Form(...)
):
    try:

        # --------------------------
        # Upload image to Cloudinary
        # --------------------------
        upload_result = cloudinary.uploader.upload(
            file.file,
            folder="wearfit/clothes",
            resource_type="image"
        )

        image_url = upload_result["secure_url"]
        cloudinary_public_id = upload_result["public_id"]

        # --------------------------
        # Save data in MongoDB
        # --------------------------
        cloth_data = {
            "user_id": user_id,
            "name": name,
            "image": image_url,
            "cloudinary_public_id": cloudinary_public_id,
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

    except Exception as e:

        print("UPLOAD ERROR:", e)

        return {
            "success": False,
            "error": str(e)
        }


# ==========================
# Get All Clothes
# ==========================
@router.get("/clothes")
async def get_clothes(
    user_id: str = Depends(get_current_user)
):
    try:

        clothes = []

        for cloth in cloth_collection.find({"user_id": user_id}):

            cloth["_id"] = str(cloth["_id"])

            clothes.append(cloth)

        return {
            "success": True,
            "count": len(clothes),
            "data": clothes
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }


# ==========================
# Get Single Cloth
# ==========================
@router.get("/cloth/{cloth_id}")
async def get_single_cloth(
    cloth_id: str,
    user_id: str = Depends(get_current_user)
):
    try:

        cloth = cloth_collection.find_one({
            "_id": ObjectId(cloth_id),
            "user_id": user_id
        })

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
async def delete_cloth(
    cloth_id: str,
    user_id: str = Depends(get_current_user)
):
    try:

        cloth = cloth_collection.find_one({
            "_id": ObjectId(cloth_id),
            "user_id": user_id
        })

        if not cloth:
            return {
                "success": False,
                "message": "Cloth not found"
            }

        # --------------------------
        # Delete Cloudinary image
        # --------------------------
        if cloth.get("cloudinary_public_id"):

            try:
                cloudinary.uploader.destroy(
                    cloth["cloudinary_public_id"],
                    resource_type="image"
                )

                print("✅ Cloudinary image deleted")

            except Exception as cloud_error:

                print(
                    "Cloudinary delete error:",
                    cloud_error
                )

        # --------------------------
        # Delete legacy local image
        # --------------------------
        elif cloth.get("image"):

            image_path = os.path.join(
                UPLOAD_DIR,
                cloth["image"]
            )

            if os.path.exists(image_path):

                os.remove(image_path)

                print("✅ Local image deleted")

        # --------------------------
        # Delete MongoDB record
        # --------------------------
        result = cloth_collection.delete_one({
            "_id": ObjectId(cloth_id),
            "user_id": user_id
        })

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

        print("DELETE ERROR:", e)

        return {
            "success": False,
            "error": str(e)
        }


# ==========================
# Update Cloth
# ==========================
@router.put("/cloth/{cloth_id}")
async def update_cloth(
    cloth_id: str,
    user_id: str = Depends(get_current_user),
    name: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    color: Optional[str] = Form(None),
    season: Optional[str] = Form(None),
    brand: Optional[str] = Form(None),
    occasion: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None)
):
    try:

        # --------------------------
        # Find cloth
        # --------------------------
        cloth = cloth_collection.find_one({
            "_id": ObjectId(cloth_id),
            "user_id": user_id
        })

        if not cloth:

            return {
                "success": False,
                "message": "Cloth not found"
            }

        updated_data = {}

        # --------------------------
        # Update text fields
        # --------------------------
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

        # --------------------------
        # New image
        # --------------------------
        if file:

            # --------------------------
            # Delete old Cloudinary image
            # --------------------------
            if cloth.get("cloudinary_public_id"):

                try:

                    cloudinary.uploader.destroy(
                        cloth["cloudinary_public_id"],
                        resource_type="image"
                    )

                    print("✅ Old Cloudinary image deleted")

                except Exception as cloud_error:

                    print(
                        "Old Cloudinary delete error:",
                        cloud_error
                    )

            # --------------------------
            # Delete old legacy local image
            # --------------------------
            elif cloth.get("image"):

                old_image = os.path.join(
                    UPLOAD_DIR,
                    cloth["image"]
                )

                if os.path.exists(old_image):

                    os.remove(old_image)

                    print("✅ Old local image deleted")

            # --------------------------
            # Upload new image to Cloudinary
            # --------------------------
            upload_result = cloudinary.uploader.upload(
                file.file,
                folder="wearfit/clothes",
                resource_type="image"
            )

            new_image_url = upload_result["secure_url"]

            new_public_id = upload_result["public_id"]

            updated_data["image"] = new_image_url

            updated_data["cloudinary_public_id"] = new_public_id

        # --------------------------
        # Debug logs
        # --------------------------
        print("================================")
        print("UPDATED DATA:", updated_data)
        print("OCCASION:", occasion)
        print("USER ID:", user_id)
        print("================================")

        # --------------------------
        # Update MongoDB
        # --------------------------
        result = cloth_collection.update_one(
            {
                "_id": ObjectId(cloth_id),
                "user_id": user_id
            },
            {
                "$set": updated_data
            }
        )

        print(
            "MODIFIED COUNT:",
            result.modified_count
        )

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
async def dashboard_stats(
    user_id: str = Depends(get_current_user)
):

    total_clothes = cloth_collection.count_documents({
        "user_id": user_id
    })

    shirts = cloth_collection.count_documents({
        "user_id": user_id,
        "category": {
            "$regex": "^shirt$",
            "$options": "i"
        }
    })

    tshirts = cloth_collection.count_documents({
        "user_id": user_id,
        "category": {
            "$regex": "^tshirt$",
            "$options": "i"
        }
    })

    pants = cloth_collection.count_documents({
        "user_id": user_id,
        "category": {
            "$regex": "^pant$",
            "$options": "i"
        }
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