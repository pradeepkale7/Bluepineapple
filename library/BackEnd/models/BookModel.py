from pydantic import BaseModel
import json

FIlE_NAME = "data/BookData.json"


def load_books():
    with open(FIlE_NAME, 'r') as file:
        return json.load(file)


def write_books(data):
    with open(FIlE_NAME, 'w') as file:
        return json.dump(data, file, indent=4)


class Book(BaseModel):
    id: int
    book_name: str
    author: str
    num_copies: int
