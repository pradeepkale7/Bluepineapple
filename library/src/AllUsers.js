import { useEffect, useState } from "react";


function AllUsers() {

    const [userList, setUserList] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8000/getAllocationData")
            .then(response => response.json())
            .then(data => setUserList(data.allocation));
    }, [])
    console.log(userList)

    return (
        <>
        <h1>List of Users</h1>
        
            <ol>
                {userList.map(user => (<li key={user.userId}>{user.userName} </li>))}
            </ol>
        </>
    );
}

export default AllUsers;