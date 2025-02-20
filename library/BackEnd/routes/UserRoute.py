
from fastapi import APIRouter
from models.UserModel import load_Users




router = APIRouter()


@router.get("/Users")
def get_Users():
    return load_Users()
