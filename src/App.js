import React, {useState, useEffect} from "react";
import Header from './components/Header'
import Home from './components/Home';
import europe from './tests/europe';


function App() {

  const [allCountries, setAllCountries] = useState(europe);

  return (
    <div className='flex flex-col items-center bg-gray-300 font-jost'>
    <Header/>
    <Home countries={allCountries}/>
    </div>
  );
}

export default App;
