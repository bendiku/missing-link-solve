// App.tsx

import React from 'react';
import './App.css';
import InfixFinder from './components/InfixFinder'; // Import the InputSection component
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="app-container">      
      <div className="content-wrapper">
        <h1>Bindeordet</h1>
        <InfixFinder />
      </div>
      
      <Footer />
    </div>
  );
};

export default App;