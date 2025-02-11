
const express = require('express');
const app = express();
const fs = require('fs')
const cors = require("cors");
const { resolve } = require('path');

app.use(express.json());
app.use(cors());



const readFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if (err) reject(err);
            else resolve(JSON.parse(data));
        });
    });
}

const writeFile = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, JSON.stringify(data, null, 2), (err) => {
            if (err) reject(err)
            else resolve({ message: "Sucessful" });
        });
    });
}


app.get("/getdata", async (req, res) => {
    res.json(await readFile('LibraryData.json'));
});

app.get("/getAllocationData", async (req, res) => {
    res.json(await readFile("Allocation.json"));
})

app.post('/addBook', async (req, res) => {
    const newBook = req.body;
    newBook.num_copies = Number(newBook.num_copies); //Converting string num_copies to Number
    let BookData = await readFile("LibraryData.json");
    let BookList = BookData.books;

    const newId = BookList[BookList.length-1].id +1;
    newBook.id = newId;
    BookList.push(newBook);

    await writeFile("LibraryData.json", BookData);
    console.log("Book Added Sucessfully");
    res.json({ message: "Book Added Sucessfully", newBook });
});

app.delete("/deleteBook", async (req, res) => {

    const { id } = req.body;
    const BookData = await readFile("LibraryData.json");
    const BookList = BookData.books.filter(book => book.id != id);
    BookData.books = BookList;

    await writeFile("LibraryData.json", BookData);
    console.log("Book Deleted ID : ", id);
    res.json({ message: "Book Delted Sucessfully ", id });

});

app.post("/allocateBook", async (req, res) => {
    const newAllocation = req.body;
    console.log(req.body);

    const BookData = await readFile("LibraryData.json");
    const AllocationData = await readFile("Allocation.json");

    const BookList = BookData.books;
    const AllocationList = AllocationData.allocation;

    newAllocation.userId = AllocationList.length > 0 ? AllocationList[AllocationList.length - 1].userId + 1 : 1;

    let BookIndexAllocation = BookList.findIndex(book => book.id === newAllocation.bookId);

    if (BookIndexAllocation === -1) res.jons({ message: "NO such Book Available" });
    console.log(BookIndexAllocation);

    if (BookList[BookIndexAllocation].num_copies < newAllocation.num_copies) {
        console.log("failed to allocate");
        return res.status(400).json({ message: "Not enough Books Avalible" })
    }

    BookList[BookIndexAllocation].num_copies -= newAllocation.num_copies;

    AllocationList.push(newAllocation);
    await writeFile("LibraryData.json", BookData);
    await writeFile("Allocation.json", AllocationData);

    res.json({ message: "Book alloted sucessfully ", allocation: newAllocation })
})


app.post("/deallocateBook", async (req, res) => {
    const { bookId, quantity } = req.body;
    const BookData = await readFile("LibraryData.json");
    const AllocationData = await readFile("Allocation.json");

    const BookList = BookData.books;
    const AllocationList = AllocationData.allocation;

    let BookIndexAllocation = AllocationList.findIndex(book => book.bookId === bookId);
    let BookIndexBook = BookList.findIndex(book => book.id === bookId);

    if (BookIndexAllocation === -1) res.jons({ message: "NO such Book Available" });

    if (AllocationList[BookIndexAllocation].num_copies < quantity) {
        console.log("failed to Deallocate");
        return res.status(400).json({ message: "MAximum number excced Avalible" })
    }

    AllocationList[BookIndexAllocation].num_copies -= quantity;
    BookList[BookIndexBook].num_copies += quantity;

    await writeFile("LibraryData.json", BookData);
    await writeFile("Allocation.json", AllocationData);

    res.json({ message: "Book has been deallocated" });

})

app.listen(8000, () => {

    console.log("Server has Started at port 5000")
})

