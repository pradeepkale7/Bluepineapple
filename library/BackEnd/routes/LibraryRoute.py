
"""
Library Route
Handles routing for Library realted operations.
"""
from datetime import date
from  fastapi import APIRouter, HTTPException, Request
from models.BookModel import load_books,write_books
from models.LibraryModel import BookAllocation ,load_Allocation,update_allocation
from models.UserModel import load_Users


router=APIRouter()

"""
Fetch Allocation details form JSON file

Returns:
    dict:Allocation data
"""

@router.get("/library")
def get_books():
    return load_Allocation()

"""
Allocate a book to a User

Args:
    allocation:BookAllocation - Book allocation details
    
Returns:
    dict:Sucess message
"""

@router.post("/allocateBook")
async def allocateBook(allocation:BookAllocation):
    books_data = load_books()
    allocation_data = load_Allocation()
    user_data=load_Users()

    books = books_data["books"]
    allocations = allocation_data["allocation"]
    users= user_data["users"]
    
    book = next((b for b in books if b["id"]==allocation.bookId),None)
    user= next((u for u in users if u["userId"]==allocation.userId),None)
    
    if not user :
        return {"message": "NO such user found Enter Correct User ID"}

    if not book or book["num_copies"] < allocation.num_copies:
        return {"message": "Not enough copies available"}

    book["num_copies"] -= allocation.num_copies
    
    allocations.append(allocation.model_dump())

    write_books(books_data)
    update_allocation(allocation_data)
    return {"message": "Book allocated successfully"}


"""
Deallocate a book from a User

Args:
    request:Request - Book deallocatoin details(bookId,quantity,userId)
    
Returns:
    dict:Sucess message
"""

@router.post("/deallocateBook")
async def deallocateBook(request: Request):
    data = await request.json()
    bookId = data.get("bookId")
    quantity = data.get("quantity")
    userId = data.get("userId")
    
    bookData = load_books()
    allocateBook = load_Allocation()

    books = bookData["books"]
    allocation = allocateBook["allocation"]

    allocated = next((book for book in allocation if book["bookId"] == bookId and book["userId"] == userId), None)

    if not allocated:
        return {"message": "Allocation not found for the specified book and user"}

    if allocated["num_copies"] < quantity:
        return {"message": "Not enough copies allocated"}

    allocated["num_copies"] -= quantity
    
    for book in books:
        if book["id"] == bookId:
            book["num_copies"] += quantity
            break

    write_books(bookData)
    update_allocation(allocateBook)
    return {"message": "Book deallocated sucessfully"}