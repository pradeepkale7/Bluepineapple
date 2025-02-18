from  fastapi import APIRouter, Request
from models.BookModel import load_books,write_books
from models.LibraryModel import BookAllocation ,load_Allocation,update_allocation


router=APIRouter()

@router.get("/getAllocationData")
def get_books():
    return load_Allocation()

@router.post("/allocateBook")
def allocate_book(allocation: BookAllocation):
    books_data = load_books()
    allocation_data = load_Allocation()

    books = books_data["books"]
    allocations = allocation_data["allocation"]

    for book in books:
        if book["id"] == allocation.bookId and book["num_copies"] >= allocation.num_copies:
            book["num_copies"] -= allocation.num_copies
            break

    new_allocation = allocation.dict()
    new_allocation["userId"] = allocations[-1]["userId"]+1

    allocations.append(new_allocation)

    write_books(books_data)
    update_allocation(allocation_data)
    return {"message": "Book allocated successfully"}


@router.post("/deallocateBook")
async def deallocateBook(request: Request):
    data = await request.json()
    bookId = data.get("bookId")
    quantity = data.get("quantity")
    userName = data.get("userName")

    book_data = load_books()
    allocate_book = load_Allocation()

    books = book_data["books"]
    allocation = allocate_book["allocation"]

    for book in allocation:
        if book["bookId"] == bookId and book["num_copies"] >= quantity and book["userName"] == userName:
            book["num_copies"] -= quantity
            break

    for book in books:
        if book["id"] == bookId:
            book["num_copies"] += quantity
            break

    write_books(book_data)
    update_allocation(allocate_book)
    return {"message": "Book deallocated sucessfully"}