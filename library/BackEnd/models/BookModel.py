from pydantic import BaseModel
import json

FIlE_NAME = "data/BookData.json"


"""
    Loads book data from JSON file.
    
    Returns:
        dict: The book data.
"""

def load_books():
    with open(FIlE_NAME, 'r') as file:
        return json.load(file)


"""
    Update book data of JSON file.
    
    Args:
        data (dict): Updated book data.
        
    Returns:
        dict: The book data.
"""
def write_books(data):
    with open(FIlE_NAME, 'w') as file:
        return json.dump(data, file, indent=4)


"""
    Book Schema

    Attributes:
        id (int): Unique identifier for the book.
        book_name (str): Title of the book.
        author (str): Author of the book.
        num_copies (int): Number of copies available.
"""


class Book(BaseModel):
    id: int
    book_name: str
    author: str
    num_copies: int
