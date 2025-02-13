from fastapi import FastAPI, Request # type: ignore
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


class BookAllocation(BaseModel):
    bookId: int
    userName: str
    num_copies: int


class Book(BaseModel):
    book_name: str
    author: str
    num_copies: int


def load_books():
    with open("LibraryData.json", 'r') as file:
        return json.load(file)


def load_Allocation():
    with open("Allocation.json", 'r') as file:
        return json.load(file)


def write_books(data, fileName):
    with open(fileName, 'w') as file:
        json.dump(data, file, indent=4)


@app.get("/getdata")
def get_books():
    return load_books()


@app.get("/getAllocationData")
def get_books():
    return load_Allocation()


@app.post("/addBook")
def add_book(book: Book):
    data = load_books()

    books = data["books"]

    newId = books[-1]["id"] + 1
    newBook = book.dict()
    newBook["id"] = newId

    books.append(newBook)
    write_books(data, "LibraryData.json")

    return {"message": "Book added ucessfully"}


@app.post("/allocateBook")
def allocate_book(allocation: BookAllocation):
    books_data = load_books()
    allocation_data = load_Allocation()

    books = books_data["books"]
    allocations = allocation_data["allocation"]

    for book in books:
        if book["id"] == allocation.bookId and book["num_copies"] >= allocation.num_copies:
            book["num_copies"] -= allocation.num_copies
            break
    
    write_books(books_data, "LibraryData.json")
    
    new_allocation = allocation.dict()
    
    new_allocation["userId"] = allocations[-1]["userId"]+1
    
    allocations.append(new_allocation)
    
    write_books(allocation_data, "Allocation.json")
    return {"message": "Book allocated successfully"}


@app.post("/deallocateBook")
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
        if book["bookId"] == bookId and book["num_copies"] >= quantity and book["userName"]==userName:
            book["num_copies"] -= quantity
            break

    for book in books:
        if book["id"] == bookId:
            book["num_copies"] += quantity
            break

    write_books(book_data, "LibraryData.json")
    write_books(allocate_book, "Allocation.json")
    return {"message": "Book deallocated sucessfully"}


@app.delete("/deleteBook")
async def deleteBook(request: Request):
    data = await request.json()
    bookid = data.get("id")

    books_data = load_books()
    books = books_data["books"]

    for i, book in enumerate(books):
        if book["id"] == bookid:
            deleteBook = books.pop(i)
            write_books(books_data, "LibraryData.json")
            return {"message": "Book delted suicessfully", "deltedbook": deleteBook}
