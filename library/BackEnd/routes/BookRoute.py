
"""
Book Route 
Handles routing for book related operations
"""

from fastapi import APIRouter, Request
from models.BookModel import Book
from models.BookModel import load_books,write_books

router=APIRouter()


"""
Fetches books details 

Returns:
    dict:Book data
"""
@router.get("/books")
def get_Books():
    return load_books()

@router.post("/books")
def add_book(book: Book):
    data = load_books()

    books = data["books"]

    newId = books[-1]["id"] + 1 if books else 1
    newBook = book.model_dump()
    newBook["id"] = newId

    books.append(newBook)
    data["books"] = books

    write_books(data)

    return {"message": "Book added ucessfully"}



@router.delete("/books")
async def delete_Book(request: Request):
    data = await request.json()
    bookid = data.get("id")

    booksData = load_books()
    books = booksData["books"]

    for i, book in enumerate(books):
        if book["id"] == bookid:
            deleteBook = books.pop(i)
            write_books(booksData)
            return {"message": "Book delted suicessfully", "deltedbook": deleteBook}