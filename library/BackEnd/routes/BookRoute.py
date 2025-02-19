from fastapi import APIRouter, Request 
from models.BookModel import load_books,write_books,Book

router=APIRouter()


@router.get("/books")
def get_Books():
    return load_books()

@router.post("/books")
def add_book(book: Book):
    data = load_books()

    books = data["books"]

    newId = books[-1]["id"] + 1 if books else 1
    newBook = book.dict()
    newBook["id"] = newId

    books.append(newBook)
    data["books"] = books

    write_books(data)

    return {"message": "Book added ucessfully"}



@router.delete("/books")
async def deleteBook(request: Request):
    data = await request.json()
    bookid = data.get("id")

    books_data = load_books()
    books = books_data["books"]

    for i, book in enumerate(books):
        if book["id"] == bookid:
            deleteBook = books.pop(i)
            write_books(books_data)
            return {"message": "Book delted suicessfully", "deltedbook": deleteBook}