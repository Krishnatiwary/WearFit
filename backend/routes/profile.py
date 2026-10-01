from fastapi import APIRouter, Depends
from bson import ObjectId

from database.database import user_collection
from utils.auth_dependency import get_current_user

router = APIRouter()


# ==========================
# Get Profile Settings
# ==========================
@router.get("/profile/settings")
async def get_profile_settings(
    user_id: str = Depends(get_current_user)
):
    user = user_collection.find_one({
        "_id": ObjectId(user_id)
    })

    if not user:
        return {
            "success": False,
            "message": "User not found"
        }

    return {
        "success": True,
        "data": {
            "name": user.get("name", "User"),
            "profile_public": user.get("profile_public", False)
        }
    }


# ==========================
# Update Profile Visibility
# ==========================
@router.put("/profile/settings")
async def update_profile_settings(
    profile_public: bool,
    user_id: str = Depends(get_current_user)
):
    result = user_collection.update_one(
        {
            "_id": ObjectId(user_id)
        },
        {
            "$set": {
                "profile_public": profile_public
            }
        }
    )

    if result.matched_count == 0:
        return {
            "success": False,
            "message": "User not found"
        }

    return {
        "success": True,
        "message": "Profile visibility updated",
        "profile_public": profile_public
    }