import { useEffect, useState } from "react";
import AllDetails from "./AllDetails";


function Deallocate() {

    const [bookId, setBookId] = useState("")
    const [quantity, setQuantity] = useState("")
    const [refereshTrigger, setTrigger] = useState(false)

    const handleAllocation = async () => {

        const response = await fetch("http://localhost:8000/deallocateBook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bookId: parseInt(bookId),
                quantity: parseInt(quantity)
            })
        });

        const data = await response.json();
        setTrigger(prev=>!prev);
        alert(data.message);
    }


    return (
        <>
            <AllDetails refereshTrigger={refereshTrigger}/> 
            <br></br>
            <label>Enter the Id of the book </label><br />
            <input type="number" value={bookId} onChange={(e) => setBookId(e.target.value)} /> <br />
            <label>Enter Quantity </label><br></br>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} /><br></br>
            <button onClick={handleAllocation}>Deallocate</button>
        </>
    );

}

export default Deallocate;