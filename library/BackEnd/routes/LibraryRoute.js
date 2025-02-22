
/**
 * Library Route
 * Handles routing for library-related operations.
 */


const express = require("express")
const router = express.Router();
const { readFile, writeFile } = require("../models/FileModel");


/**
 * GET /library
 * Allocate a book to a user.
 * @route GET /library
 * @returns {Object} List of all Books and allocation
 */

router.get("/library", async (req, res) => {
    res.json(await readFile("data/Allocation.json"));
})

/**
 * POST /allocateBook
 * Allocate a book to a user.
 * @route POST /allocateBook
 * @param {number} bookId - ID of the book to allocate.
 * @param {number} userId - ID of the user.
 * @param {string} issue_Date - Issue date for the book.
 * @param {string} return_Date - Return date for the book
 * @returns {Object} Success or error message.
 */
router.post("/allocateBook", async (req, res) => {
    try {
        const newAllocation = req.body;

        const BookData = await readFile("data/BookData.json");
        const AllocationData = await readFile("data/Allocation.json");
        const UserData=  await readFile("data/Users.json")

        const BookList = BookData.books;
        const AllocationList = AllocationData.allocation;
        const UserList = UserData.users;

        let BookIndexAllocation = BookList.findIndex(book => book.id === newAllocation.bookId);
        let UserIndex = UserList.findIndex(User =>User.userId === newAllocation.userId);

        if (BookIndexAllocation === -1) {
            return res.status(404).json({ message: "Book not found" });
        }
        if(UserIndex===-1){
            return res.status(404).json({ message: "No User Found Please Enter Correct User Id" });
        }

        if (BookList[BookIndexAllocation].num_copies < newAllocation.num_copies) {
            return res.status(404).json({ message: "Not enough Books Avalible" })
        }

        BookList[BookIndexAllocation].num_copies -= newAllocation.num_copies;
        AllocationList.push(newAllocation);

        await writeFile("data/BookData.json", BookData);
        await writeFile("data/Allocation.json", AllocationData);

        res.json({ message: "Book alloted sucessfully ", allocation: newAllocation })
    } catch (err) {
        return res.status(err.status).json({ message: err.message });
    }
})


/**
 * POST /deallocateBook
 * Deallocate a book from a user.
 * @route POST /deallocateBook
 * @param {number} bookId - ID of the book to allocate.
 * @param {number} userId - ID of the user.
 * @returns {Object} Success or error message.
 */

router.post("/deallocateBook", async (req, res) => {
    try {
        const { bookId, quantity, userId } = req.body;

        const BookData = await readFile("data/BookData.json");
        const AllocationData = await readFile("data/Allocation.json");

        const BookList = BookData.books;
        const AllocationList = AllocationData.allocation;

        let BookIndexAllocation = AllocationList.findIndex(book => book.bookId === bookId & book.userId === userId);
        let BookIndexBook = BookList.findIndex(book => book.id === bookId);
        if (BookIndexAllocation === -1) res.json({ message: "NO such Book Available" });

        if (AllocationList[BookIndexAllocation].num_copies < quantity) {
            return res.status(400).json({ message: "MAximum number excced Avalible" })
        }

        AllocationList[BookIndexAllocation].num_copies -= quantity;
        BookList[BookIndexBook].num_copies += quantity;

        await writeFile("data/BookData.json", BookData);
        await writeFile("data/Allocation.json", AllocationData);

        res.json({ message: "Book has been deallocated" });
    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message });
    }
})

module.exports = router