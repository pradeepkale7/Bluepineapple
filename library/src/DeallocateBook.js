import { useEffect, useState } from "react";
import AllDetails from "./AllDetails";


function Deallocate() {

    const [bookId, setBookId] = useState("")
    const [userName, setUserName] = useState("")
    const [refereshTrigger, setTrigger] = useState(false)

    const handleAllocation = async () => {

        const response = await fetch("http://localhost:8000/deallocateBook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bookId: parseInt(bookId),
                quantity: parseInt(1),
                userName:userName
            })
        });

        const data = await response.json();
        setTrigger(prev=>!prev);
        alert(data.message);
    }


    return (
        <>
             <AllDetails refereshTrigger={refereshTrigger}/> 
        
           <div>
            <br></br>
            <label>Enter the Id of the book </label><br />
            <input type="number" value={bookId} onChange={(e) => setBookId(e.target.value)} /> <br />
            <label>Enter User Name </label><br></br>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} /><br></br>
            <button onClick={handleAllocation}>Deallocate</button>
            </div>
        </>
    );

}

export default Deallocate;