from pydantic import BaseModel

class Cloth(BaseModel):
    name: str
    category: str
    color: str
    season: str