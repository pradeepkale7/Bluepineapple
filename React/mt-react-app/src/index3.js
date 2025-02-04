import React from 'react';

const TodoList = () => {

    const tasks = [
        { id: 1, text: "Learn React " },
        { id: 2, text: "Pratice React " },
        { id: 3, text: "Code React " },
        { id: 4, text: "Complete React " }
    ];

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>{task.text}</li>
            ))}
        </ul>
    )
}



export default TodoList;