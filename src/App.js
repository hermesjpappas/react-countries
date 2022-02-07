import React from "react";
import Header from './components/Header'
import Home from './components/Home';



function App() {
  return (
    <div className='h-screen w-screen flex flex-col items-center font-sans bg-gray-300 '>
    <Header/>
    <Home />
    </div>
  );
}

export default App;
