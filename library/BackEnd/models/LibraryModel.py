
"""
Library Model to handle interactino between books and users
"""

from datetime import date
import json
from pydantic import BaseModel

FILE_NAME = "data/Allocation.json"


"""
       Loads allocation data from JSON file.

       Returns:
           dict: The allocation data.
"""
def load_Allocation():
    with open(FILE_NAME, 'r') as file:
        return json.load(file)



"""
    Writes updated allocation data to JSON file.
    
    Args:
        data (dict): Updated allocation data.
"""
def update_allocation(data):
    with open(FILE_NAME, 'w') as file:
        return json.dump(data, file, indent=4, default=str)


"""
    Book Allocation Schema

    Attributes:
        bookId (int): ID of the book being allocated.
        userId (int): ID of the user to whom the book is allocated.
        num_copies (int): Number of copies being allocated default(1).
        issue_Date (date): Date of allocation.
        return_Date (date): Expected return date.
"""


class BookAllocation(BaseModel):
    bookId: int
    userId: int
    num_copies: int
    issue_Date: date
    return_Date: date
