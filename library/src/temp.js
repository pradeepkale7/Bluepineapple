
import { useState } from 'react';
import AllDetails from './AllDetails'
import AuthorBook from './AuthorBook'
import AddBook from './AddBook.js';
import DeleteBook from './DeleteBook';
import AllocateBook from './AllocateBook';




function Menu() {
    const [display, setDisplay] = useState("");



    return (
        <>
            <button onClick={setDisplay("AuthorBook")}>Get Author Books</button>
            <button onClick={setDisplay("AllDetails")} >Get All Books</button>
            <button onClick={setDisplay("AddBook")}>Add Book</button>
            <button onClick={setDisplay("DeleteBook")}>Delete Book</button>
            <button onClick={setDisplay("AllocateBook")}>Allocate Book</button>
            <button onClick={setDisplay("DeallocateBook")}>Deallocate Book</button>
            <div>

                {display == "AuhtorBook" ? <AuthorBook /> : null}
                {display == "AllDetails" ? <AllDetails /> : null}
                {display == "AddBook" ? <AddBook /> : null}
                {display == "DeleteBook" ? <DeleteBook /> : null}
                {display == "AllocateBook" ? <AllocateBook /> : null}
                {display == "AuhtorBook" ? <AuthorBook /> : null}
            </div>
        </>
    );

}

export default Menu