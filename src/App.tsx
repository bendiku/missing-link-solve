// App.tsx

import React from 'react';
import './App.scss';
import InputSection from './components/InputSection'; // Import the InputSection component
import Footer from './components/Footer';

const App: React.FC = () => {

  return (
    <>
    <div className="app-container">
      <h1>Bindeordet</h1>
      <div className="grid-container">
        <InputSection />
      </div>
      {/* <div className='wrapper'>
	     <div className="divider div-transparent div-arrow-down"></div>
      </div> */}
    </div>
    <Footer />
     </>
  );
};

export default App;
