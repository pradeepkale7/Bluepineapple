from datetime import date
from  fastapi import APIRouter, HTTPException, Request
from models.BookModel import load_books,write_books
from models.LibraryModel import BookAllocation ,load_Allocation,update_allocation



router=APIRouter()

@router.get("/library")
def get_books():
    return load_Allocation()

@router.post("/allocateBook")
async def allocate_book(allocation:BookAllocation):
    print(allocation)
    books_data = load_books()
    allocation_data = load_Allocation()

    books = books_data["books"]
    allocations = allocation_data["allocation"]
    
    book = next((b for b in books if b["id"]==allocation.bookId),None)

    if not book or book["num_copies"] < allocation.num_copies:
        raise HTTPException(status_code=400,details="Not enough copies available")

    book["num_copies"] -= allocation.num_copies
    
    allocations.append(allocation.model_dump())

    write_books(books_data)
    update_allocation(allocation_data)
    return {"message": "Book allocated successfully"}


@router.post("/deallocateBook")
async def deallocateBook(request: Request):
    data = await request.json()
    bookId = data.get("bookId")
    quantity = data.get("quantity")
    userId = data.get("userId")
    
    if not bookId or not quantity or not userId:
        raise HTTPException(status_code=400, detail="Missing required fields")

    book_data = load_books()
    allocate_book = load_Allocation()

    books = book_data["books"]
    allocation = allocate_book["allocation"]

    allocated = next((book for book in allocation if book["bookId"] == bookId and book["userId"] == userId), None)

    if not allocated:
        raise HTTPException(status_code=404, detail="Allocation not found for the specified book and user")

    if allocated["num_copies"] < quantity:
        raise HTTPException(status_code=400, detail="Not enough copies allocated")

    allocated["num_copies"] -= quantity
    
    for book in books:
        if book["id"] == bookId:
            book["num_copies"] += quantity
            break

    write_books(book_data)
    update_allocation(allocate_book)
    return {"message": "Book deallocated sucessfully"}