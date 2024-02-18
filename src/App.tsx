// App.tsx

import React from 'react';
import './App.scss';
import InputSection from './components/InputSection'; // Import the InputSection component

const App: React.FC = () => {

  return (
    <div className="app-container">
      <h1>Missing-Link Solve</h1>
      <div className="grid-container">
        {/* Repeat the InputSection component twelve times */}
        <InputSection />
      </div>
    </div>
  );
};

export default App;
