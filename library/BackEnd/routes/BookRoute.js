
const express = require("express");
const router=express.Router();
const fs = require("fs");

const {readFile,writeFile}=require("../models/BookModel")


router.get("/books", async (req, res) => {
    res.json(await readFile('data/BookData.json'));
});


router.post('/books', async (req, res) => {
    try {
        const newBook = await req.body;
        console.log(newBook);

        let BookData = await readFile("data/BookData.json");
        let BookList = BookData.books;

        const newId = BookList.length > 0 ? BookList[BookList.length - 1].id + 1 : 1;
        newBook.id = newId;
        console.log(newBook);
        BookData.books.push(newBook);

        await writeFile("data/BookData.json", BookData);
        res.json({ message: "Book Added Sucessfully", newBook });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.delete("/books", async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(400).json({ message: "Book ID is required" });

        const BookData = await readFile("data/BookData.json");
        const AllocationData = await readFile("data/Allocation.json")

        const BookList = BookData.books.filter(book => book.id != id);
        const AllocationList = AllocationData.allocation.filter(book => book.bookId != id);

        if (BookList.length === BookData.books.length) {
            return res.status(404).json({ message: "Book not found" });
        }

        BookData.books = BookList;
        AllocationData.allocation = AllocationList;

        await writeFile("data/BookData.json", BookData);
        await writeFile("data/Allocation.json", AllocationData);
        res.json({ message: "Book Delted Sucessfully ", id });

    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});


module.exports=router;