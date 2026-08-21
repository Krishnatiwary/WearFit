print("auth_service imported")

from database.database import user_collection
from utils.hash import hash_password, verify_password
from utils.jwt_handler import create_access_token


async def signup_user(user):
    print("========== SIGNUP ==========")
    print("Name:", user.name)
    print("Email:", user.email)
    print("Password:", user.password)
    print("Password Length:", len(user.password))

    existing_user = user_collection.find_one({"email": user.email})

    if existing_user:
        return {
            "success": False,
            "message": "Email already exists"
        }

    hashed = hash_password(user.password)
    print("Hashed Password:", hashed)

    user_data = {
        "name": user.name,
        "email": user.email,
        "password": hashed,
    }

    user_collection.insert_one(user_data)

    return {
        "success": True,
        "message": "User registered successfully",
    }


async def login_user(user):
    print("========== LOGIN ==========")
    print("Email:", user.email)
    print("Password:", user.password)
    print("Password Length:", len(user.password))

    existing_user = user_collection.find_one({"email": user.email})

    if not existing_user:
        return {
            "success": False,
            "message": "Invalid email"
        }

    if not verify_password(user.password, existing_user["password"]):
        return {
            "success": False,
            "message": "Invalid password"
        }

    token = create_access_token({
        "email": existing_user["email"],
        "id": str(existing_user["_id"])
    })

    return {
        "success": True,
        "token": token
    }