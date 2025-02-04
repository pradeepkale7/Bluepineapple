import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './index5';
import UserData from './index1';
import InputFocus from './index2';
import TodoList from './index3';
import ParentChild from './index4';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App />
    <UserData />
    <InputFocus/>
    <TodoList/> */}
    <ParentChild/>
  </React.StrictMode>
);


