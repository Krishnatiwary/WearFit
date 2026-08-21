from pydantic import BaseModel


class Cloth(BaseModel):
    user_id: str
    image: str
    category: str
    color: str
    season: str
    brand: str