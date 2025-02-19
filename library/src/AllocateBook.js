import { useState,useEffect } from "react";
import AllDetails from "./AllDetails";



function AllocateBook() {

    const [selectedBook, setSelectedBook] = useState("");
    const [userID, setUserID] = useState("");
    const [userList,setUserList]=useState([]);
    const [refereshTrigger, setTrigger] = useState(false);
    const [returnDate, setReturnDate] = useState("");
    const [issueDate,setIssueDate]=useState("");

    useEffect(()=>{

    },[])

    useEffect(() => {
        fetch("http://localhost:8000/Users")
            .then(response => response.json())
            .then(data => setUserList(data.users));
    }, [])

    const handleAllocation = async () => {
        if (!selectedBook || !userID || !returnDate) {
            alert("please fill all fields");
            return;
        }

        const requestData={
            bookId: parseInt(selectedBook),
            userId: parseInt(userID),
            num_copies: 1,
            issue_Date:issueDate,
            return_Date: returnDate,
        }

        console.log(requestData);
try{
        const response = await fetch("http://localhost:8000/allocateBook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        // if (!response.ok) {
        //     throw new Error(data.detail ? data.detail : "Failed to allocate book");
        // }
        setTrigger(prev => !prev);
        alert(data["message"]);

    }catch(error){
        console.error(error);
        alert("Error: "+ error.message);
    }

    }
    return (
        <>

            <AllDetails refereshTrigger={refereshTrigger} />

            <div><br /><br />
                <h1>Allocate Book </h1>
                <option value=""></option>
                <label>User ID</label><br></br>
                <input type="number" value={userID} onChange={(e) => setUserID(e.target.value)} placeholder="If User already exist" /><br></br>
                <label >BookID</label><br></br>
                <input type="number" value={selectedBook} onChange={e => setSelectedBook(e.target.value)} min={0}/><br></br>
                <label>Issue Date</label>
                <input onChange={e => setIssueDate(e.target.value)} value={issueDate} type="date" />
                <label>Return Date</label><br></br>
                <input onChange={e => setReturnDate(e.target.value)} value={returnDate} type="date" />
                {console.log(returnDate)}
                <button onClick={handleAllocation}>Submit</button>
            </div>
        </>
    );
}


export default AllocateBook;