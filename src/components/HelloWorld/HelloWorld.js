import React, { useState } from 'react';

export const HelloWorld = () => {
  const [text, setText] = useState('Hello, World!');

  const handleClick = () => {
    setText('Hello, React Testing Library!');
  };

  return (
    <div>
      <h1>{text}</h1>
      <button onClick={handleClick}>Change Text</button>
    </div>
  );
};
