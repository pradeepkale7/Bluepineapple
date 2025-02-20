import { useState } from "react";
import AllDetails from "./AllDetails";


function Deallocate() {

    const [bookId, setBookId] = useState("")
    const [userId, setUserId] = useState("")
    const [refereshTrigger, setTrigger] = useState(false)

    const handleAllocation = async () => {
        if (!bookId || !userId ) {
            alert("Please fill all fields correctly");
            return;
        }

        const requestData = {
            bookId: parseInt(bookId),
            quantity: 1,
            userId: parseInt(userId)
        }
        try {
            const response = await fetch("http://localhost:8000/deallocateBook", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });
            if (!response.ok) {
                throw new Error("Fail to deallocate Book");
            }
            const data = await response.json();
            setTrigger(prev => !prev);
            alert(data.message);
        } catch (error) {
            console.error(error);
            alert("Error: " + error.message);
        }

    };
    return (
        <>
            <AllDetails refereshTrigger={refereshTrigger} />

            <div>
                <h1>Deallocate Book</h1>
                <label>Enter the Id of the book </label><br />
                <input type="number" value={bookId} onChange={(e) => setBookId(e.target.value)} /> <br />
                <label>Enter User ID </label><br></br>
                <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} /><br></br>
                <button onClick={handleAllocation}>Deallocate</button>
            </div>
        </>
    );

}

export default Deallocate;