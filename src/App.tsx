// App.tsx

import React, { useState } from 'react';
import './App.css';
import InputSection from './components/InputSection'; // Import the InputSection component

const App: React.FC = () => {
  const [prefix, setPrefix] = useState<string>('');
  const [suffix, setSuffix] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'prefix') {
      setPrefix(value);
    } else if (name === 'suffix') {
      setSuffix(value);
    }
  };

  return (
    <div className="app-container">
      <h1>Missing-Link Solve</h1>
      <div className="grid-container">
        {/* Repeat the InputSection component twelve times */}
        {Array.from({ length: 12 }).map((_, index) => (
          <InputSection
            key={index}
            prefix={prefix}
            suffix={suffix}
            handleInputChange={handleInputChange}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
