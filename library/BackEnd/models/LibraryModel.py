

import json
from pydantic import BaseModel

FILE_NAME="data/Allocation.json"

def load_Allocation():
    with open(FILE_NAME, 'r') as file:
        return json.load(file)

def update_allocation(data):
    with open(FILE_NAME, 'w') as file:
       return  json.dump(data, file, indent=4)

class BookAllocation(BaseModel):
    bookId: int
    userName: str
    num_copies: int
