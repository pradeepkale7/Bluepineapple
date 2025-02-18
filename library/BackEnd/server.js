
const express = require('express');
const app = express();
const fs = require('fs')
const cors = require("cors");


app.use(express.json());
app.use(cors());


//help to reads files
const readFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if (err) {
                console.error("Error reading file ", err);
                reject({ message: "Internal srver error" });
            }
            else { resolve(JSON.parse(data)); }
        });
    });
}

const writeFile = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.error("Error writing in file ", err);
                reject({ message: "Internal error" });
            }
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
    try {
        const newBook = await req.body;
        if (!newBook.title || newBook.num_copies || newBook.author) {
            return res.status(400).json({ message: "Invalid Book data " })
        }

        newBook.num_copies = Number(newBook.num_copies); //Converting string num_copies to Number
        let BookData = await readFile("LibraryData.json");
        let BookList = BookData.books;

        const newId = BookList.length > 0 ? BookList[BookList.length - 1].id + 1 : 1;
        newBook.id = newId;
        console.log(newBook);
        BookData.books.push(newBook);

        await writeFile("LibraryData.json", BookData);
        res.json({ message: "Book Added Sucessfully", newBook });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

app.delete("/deleteBook", async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(400).json({ message: "Book ID is required" });

        const BookData = await readFile("LibraryData.json");
        const AllocationData = await readFile("Allocation.json")

        const BookList = BookData.books.filter(book => book.id != id);
        const AllocationList = AllocationData.allocation.filter(book => book.bookId != id);

        if (BookList.length === BookData.books.length) {
            return res.status(404).json({ message: "Book not found" });
        }

        BookData.books = BookList;
        AllocationData.allocation = AllocationList;

        await writeFile("LibraryData.json", BookData);
        await writeFile("Allocation.json", AllocationData);
        res.json({ message: "Book Delted Sucessfully ", id });

    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

app.post("/allocateBook", async (req, res) => {
    try {

        const newAllocation = req.body;
        console.log(req.body);

        const BookData = await readFile("LibraryData.json");
        const AllocationData = await readFile("Allocation.json");

        const BookList = BookData.books;
        const AllocationList = AllocationData.allocation;

        let BookIndexAllocation = BookList.findIndex(book => book.id === newAllocation.bookId);
        if (BookIndexAllocation === -1) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (BookList[BookIndexAllocation].num_copies < newAllocation.num_copies) {
            return res.status(404).json({ message: "Not enough Books Avalible" })
        }

        newAllocation.userId = AllocationList.length > 0 ? AllocationList[AllocationList.length - 1].userId + 1 : 1;
        BookList[BookIndexAllocation].num_copies -= newAllocation.num_copies;
        AllocationList.push(newAllocation);

        await writeFile("LibraryData.json", BookData);
        await writeFile("Allocation.json", AllocationData);

        res.json({ message: "Book alloted sucessfully ", allocation: newAllocation })
    } catch (err) {
        return res.status(err.status).json({ message: err.message });
    }
})


app.post("/deallocateBook", async (req, res) => {
    try {
        const { bookId, quantity, userName } = req.body;
        if (!bookId || !quantity || !userName) {
            return res.status(400).json({ message: "Missing required fileds" })
        }

        const BookData = await readFile("LibraryData.json");
        const AllocationData = await readFile("Allocation.json");

        const BookList = BookData.books;
        const AllocationList = AllocationData.allocation;
        console.log(AllocationList);

        let BookIndexAllocation = AllocationList.findIndex(book => book.bookId === bookId & book.userName === userName);
        let BookIndexBook = BookList.findIndex(book => book.id === bookId);
        console.log(BookIndexAllocation, BookIndexBook);
        if (BookIndexAllocation === -1) res.json({ message: "NO such Book Available" });

        console.log(AllocationList[BookIndexAllocation].num_copies);

        if (AllocationList[BookIndexAllocation].num_copies < quantity) {
            console.log("failed to Deallocate");
            return res.status(400).json({ message: "MAximum number excced Avalible" })
        }

        AllocationList[BookIndexAllocation].num_copies -= quantity;
        BookList[BookIndexBook].num_copies += quantity;

        await writeFile("LibraryData.json", BookData);
        await writeFile("Allocation.json", AllocationData);

        res.json({ message: "Book has been deallocated" });
    } catch (err) {
        return res.status(err.status || 500).json({ message: error.message });
    }
})

app.listen(8000, () => {
    console.log("Server has Started at port 5000")
})

