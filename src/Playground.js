import React, { useState } from 'react';

export default function Playground() {
  const [count, setCount] = useState(0);
  return (
    <div>
      {count}
      <button onClick={() => setCount((currentCount) => currentCount - 1)}> - </button>
      <button onClick={() => setCount((currentCount) => currentCount + 1)}> + </button>
    </div>
  );
}
