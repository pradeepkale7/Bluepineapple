import { useState ,useEffect} from "react";

function DeleteBook() {
    const [books, setData] = useState([]);

    const handleDelete = async (id) => {
        const response = await fetch("http://localhost:8000/deleteBook", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        const data = await response.json();
        alert(data.message);

        setData(books.filter(book => !(book.id === id)));
    };

    useEffect(() => {
        fetch("http://localhost:8000/getdata")
            .then(response => response.json())
            .then(data => setData(data.books));

    }, []);


    return (
        <>
            {books.length > 0 ? (
                <div>
                    <h2>Book List</h2>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Book Name</th>
                                <th>Author</th>
                                <th>Number of Copies</th>
                                <th>Delete Record</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.book_name}</td>
                                    <td>{book.author}</td>
                                    <td>{book.num_copies}</td>
                                    <td>
                                        <button onClick={() => handleDelete(book.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h1>Nothing to show</h1>
            )}
        </>
    );
}

export default DeleteBook;
