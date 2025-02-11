import { useEffect, useState } from "react";
import AllDetails from "./AllDetails";

function AllocateBook(){

    const [userName,setUserName]=useState("");
    const [selectedBook,setSelectedBook]=useState("");
    const [numOfCopies,setNumCopies]=useState("");
    const [refereshTrigger,setTrigger]=useState(false);

    const handleAllocation = async ()=>{
        if(!selectedBook || !userName || !numOfCopies){
            alert("please fill all fields");
            return ;
        }

        const response = await fetch("http://localhost:8000/allocateBook",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bookId: parseInt(selectedBook),
                userName:userName,
                num_copies: parseInt(numOfCopies)
            })    
        });

        const data = await response.json();
        setTrigger(prev=>!prev);
        alert(data);
        


    }
    return (
        <>
        <div>
           <AllDetails refereshTrigger={refereshTrigger}/>
        </div>

        <div><br /><br />
        <h1>Allocate Book </h1>
        <label>Your Name</label><br></br>
        <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} /><br></br>
        <label >BookID</label><br></br>
        <input type="number" value={selectedBook} onChange={e=>setSelectedBook(e.target.value)} /><br></br>
        <label>Number Of Copies</label><br></br>
        <input type="number" value={numOfCopies} onChange={e=>setNumCopies(e.target.value)} ></input><br></br>
        <button onClick={handleAllocation}>Submit</button>
        </div>
        </>
    );
}


export default AllocateBook;