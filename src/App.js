import React from "react";
import Header from './components/Header'
import Country from './components/Country'


function App() {
  return (
    <div className='font-sans'>
    <Header/>
    <div>
      {/* container for Country component grid */}
      {/* search bar and dropdown here */}
      <Country /> {/* replicated / mapped from data */}
    </div>

    </div>
  );
}

export default App;
