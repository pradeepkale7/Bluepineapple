"""
User Route
Handle routing for User realted operations
"""


from fastapi import APIRouter
from models.UserModel import load_Users

router = APIRouter()



"""
Fetch the User data from JSON file

Returns:
    dict:User data

"""
@router.get("/Users")
def get_Users():
    return load_Users()
