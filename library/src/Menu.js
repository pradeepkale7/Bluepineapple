
import { useState } from 'react';
import AllDetails from './AllDetails'
import AuthorBook from './AuthorBook'
import AddBook from './AddBook.js';
import DeleteBook from './DeleteBook';
import AllocateBook from './AllocateBook';
import Deallocate from './DeallocateBook.js';
import AllUsers from './AllUsers.js';
import "./Menu.css"


function Menu() {
   const [display, setDisplay] = useState("");

   return (
      <>
       
  <h1>Library Management </h1>
  
         <div className='flex-container'>
         <div class="container">
               <button class="button" onClick={() => setDisplay("AllDetails")} >Get All Books</button>
            </div>
            <div class="container">
               <button class="button" onClick={() => setDisplay("AllUsers")} >Get All Users</button>
            </div>
            <div class="container">
               <button class="button" onClick={() => setDisplay("AuthorBook")}>Get Author Books</button>
            </div>
            <div class="container">
               <button class="button" onClick={() => setDisplay("AddBook")}>Add Book</button>
            </div>
            <div class="container">
               <button class="button" onClick={() => setDisplay("DeleteBook")}>Delete Book</button>
            </div>
            <div class="container">
               <button class="button" onClick={() => setDisplay("AllocateBook")}>Allocate Book</button>
            </div>
            <div class="container">
               <button class="button" onClick={() => setDisplay("Deallocate")}>Deallocate Book</button>
            </div>
         </div>
         <div className='flex-container2'>
            <div className='innerConatiner'>
               {display == "AuthorBook" ? <AuthorBook /> : null}
               {display == "AllDetails" ? <AllDetails /> : null}
               {display == "AddBook" ? <AddBook /> : null}
               {display == "DeleteBook" ? <DeleteBook /> : null}
               {display == "AllocateBook" ? <AllocateBook /> : null}
               {display == "Deallocate" ? <Deallocate /> : null}
               {display == "AllUsers" ? <AllUsers /> : null}
            </div>
         </div>
      </>
   );

}

export default Menu