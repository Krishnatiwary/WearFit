from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

client = MongoClient(MONGODB_URI)

# Force connection
client.admin.command("ping")

db = client[DATABASE_NAME]

user_collection = db["users"]
cloth_collection = db["clothes"]

print("✅ MongoDB Connected Successfully")