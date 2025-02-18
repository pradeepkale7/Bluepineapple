from fastapi import FastAPI
from routes.BookRoute import router as book_route
from routes.LibraryRoute import router as library_route
from fastapi.middleware.cors import CORSMiddleware

app =FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(book_route)
app.include_router(library_route)
# app.include_router(user_route)