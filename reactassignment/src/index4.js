import { useState } from "react";


//child1
const Sender = ({ setMessage }) => {
    return (
        <>
            <label>Enter the Text Here </label>
            <input type="text" onChange={(e) => setMessage(e.target.value)} />

        </>
    );
}


//child2
const Receiver = ({ message }) => {
    return <h1>Received :  {message || "Loading..."}</h1>
}


//Parent component 
const ParentChild = () => {
    const [message, setMessage] = useState("");
    return (
    <>


        <Sender setMessage={setMessage} />
        <Receiver message={message} />

    </>
    );
}

export default ParentChild;