
import React, { useState,useEffect } from "react";
const UserData = () => {

    const [user, setuser] = useState(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => setuser(data[0]));
    },)


    return (
        <div>
            <h2>User Information</h2>
            {user ? <p>{user.name} -{user.email}</p> : <p>Loading....</p>}
        </div>
    );

};

export default UserData;
