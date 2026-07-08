from pymongo import MongoClient
from dotenv import load_dotenv
import os
import certifi

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

client = MongoClient(
    MONGODB_URI,
    tls=True,
    tlsCAFile=certifi.where()
)

db = client[DATABASE_NAME]

print("✅ MongoDB Connected Successfully")