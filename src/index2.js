import React, { useRef } from "react";

const InputFocus = () => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Enter text..." />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
};

export default InputFocus;

