

import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
<>   <h2>Counter :{count}</h2>
      <button onClick={() => setCount(count + 1)}>Increase Count </button>
    
  </>
  );
}

export default App;


