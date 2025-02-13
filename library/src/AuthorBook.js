import { useEffect, useState } from "react";
import "./Author.css"

function AuthorBook() {

    const [booklist, setbooks] = useState([]);
    const [authorName, setAuthName] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/getdata")
            .then(response => response.json())
            .then(data => setbooks(data.books));
    }, [])
    const books = booklist.filter(book => book.author == authorName);
    console.log(authorName);

    console.log(books);
    return (
        <>
<div class="galaxy"></div>
<div id="search-container">
  <div class="nebula"></div>
  <div class="starfield"></div>
  <div class="cosmic-dust"></div>
  <div class="cosmic-dust"></div>
  <div class="cosmic-dust"></div>

  <div class="stardust"></div>

  <div class="cosmic-ring"></div>

  <div id="main">
    <input
      className="input"
      name="text"
      type="text"
      value={authorName}
      placeholder="Enter the Author Name"
      onChange={(e) => setAuthName(e.target.value)}
    />
    <div id="input-mask"></div>
    <div id="cosmic-glow"></div>
    <div class="wormhole-border"></div>
    <div id="wormhole-icon">
      <svg
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="2"
        stroke="#a9c7ff"
        fill="none"
        height="24"
        width="24"
        viewBox="0 0 24 24"
      >
        <circle r="10" cy="12" cx="12"></circle>
        <path
          d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
        ></path>
        <path d="M2 12h20"></path>
      </svg>
    </div>
    <div id="search-icon">
      <svg
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="2"
        stroke="url(#cosmic-search)"
        fill="none"
        height="24"
        width="24"
        viewBox="0 0 24 24"
      >
        <circle r="8" cy="11" cx="11"></circle>
        <line y2="16.65" x2="16.65" y1="21" x1="21"></line>
        <defs>
          <linearGradient gradientTransform="rotate(45)" id="cosmic-search">
            <stop stop-color="#a9c7ff" offset="0%"></stop>
            <stop stop-color="#6e8cff" offset="100%"></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
</div>

            <h1>List of Book By {authorName}</h1>

            {books.length >0 ? (
                <ul>
                {books.map(book => (
                    <li key={book.id}>{book.book_name}</li>
                ))}
            </ul>
            ): <h3>No Books availble for this {authorName}</h3>}
            
        </>
    );
}

export default AuthorBook;