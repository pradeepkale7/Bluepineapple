import {  useState } from "react";
import AllDetails from "./AllDetails";
import DatePicker from 'react-date-picker';


function AllocateBook() {

    const [userName, setUserName] = useState("");
    const [selectedBook, setSelectedBook] = useState("");
    const [userID, setUserID] = useState("");
    const [refereshTrigger, setTrigger] = useState(false);
    const [endDate, setEndDate] = useState(new Date());

    const handleAllocation = async () => {
        if (!selectedBook || !userName) {
            alert("please fill all fields");
            return;
        }
        if (userID == "") { setUserID(-1) }

        const response = await fetch("http://localhost:8000/allocateBook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bookId: parseInt(selectedBook),
                userName: userName,
                num_copies: parseInt(1),
                userID: parseInt(userID)
            })
        });

        const data = await response.json();
        setTrigger(prev => !prev);
        alert(data["message"]);



    }
    return (
        <>

            <AllDetails refereshTrigger={refereshTrigger} />

            <div><br /><br />
                <h1>Allocate Book </h1>
                <label>User Name</label><br></br>
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} /><br></br>
                <label>User ID</label><br></br>
                <input type="text" value={userID} onChange={(e) => setUserID(e.target.value)} placeholder="If User already exist" /><br></br>
                <label >BookID</label><br></br>
                <input type="number" value={selectedBook} onChange={e => setSelectedBook(e.target.value)} /><br></br>
                <DatePicker onChange={date => setEndDate(date)} value={endDate} />
                <button onClick={handleAllocation}>Submit</button>
            </div>
        </>
    );
}


export default AllocateBook;