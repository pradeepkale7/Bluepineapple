import { useEffect, useState } from "react";

function AllDetails() {
  const [books, setBooks] = useState([]);
  const [allocations, setAllocations] = useState([]);

  // Fetch books
  useEffect(() => {
    fetch("http://localhost:8000/books")
      .then(response => response.json())
      .then(data => setBooks(data.books));
  }, []);

  // Fetch allocations
  useEffect(() => {
    fetch("http://localhost:8000/library")
      .then(response => response.json())
      .then(data => setAllocations(data.allocation));
  }, []);

  console.log(books);
  console.log(allocations);

  return (
    <>
      {books.length > 0 ? (
        <div>
          <h2>Book List with Allocations</h2>
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Book Name</th>
                <th>Author</th>
                <th>Number of Copies</th>
                <th>Allocated To (User & Copies)</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => {
                // Find allocations for the current book
                const bookAllocations = allocations.filter(a => a.bookId === book.id && a.num_copies > 0);

                return (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.book_name}</td>
                    <td>{book.author}</td>
                    <td>{book.num_copies}</td>
                    <td>
                      {bookAllocations.length > 0 ? (
                        <ul>
                          {bookAllocations.map((alloc) => (
                            <li key={alloc.userId}>
                              User ID: {alloc.userId} - {alloc.userName} ({alloc.num_copies} copies)
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "Not Allocated"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>Nothing to show</h1>
      )}
    </>
  );
}

export default AllDetails;
