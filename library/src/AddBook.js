
import { useState } from "react";




function AddBook() {

    const [newBook, setBook] = useState({
        book_name: "",
        author: "",
        num_copies: 0
    })

    const handleSubmit =async (e) => {
        e.preventDefault();
        const response = await  fetch("http://localhost:8000/addBook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBook),
        });

        console.log(newBook);
    const data = await response.json();
    alert(data.message); 
    setBook({ book_name: "", author: "", num_copies: 0 });
    }

    const handleChange = (e) => {
        setBook({ ...newBook, [e.target.name]: e.target.value })
    }

    return (
        <>
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="book_name" value={newBook.book_name} onChange={handleChange} placeholder="Name of the Book" required />
                <input type="text" name="author" value={newBook.author}  onChange={handleChange} placeholder="Author" required />
                <input type="number" name="num_copies" value={newBook.num_copies} onChange={handleChange} placeholder="No Of copies" min="0" required />
                <button type="submit">Add Book</button>
            </form>
        </>
    );
}

export default AddBook;