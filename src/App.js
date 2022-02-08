import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Details from "./components/Details";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [terms, setTerms] = useState({
    searchTerm: "",
    regionSelection: "none",
  });

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setAllCountries(data);
        setSelectedCountries(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setTerms((prevTerms) => {
      return {
        ...prevTerms,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    if (terms.regionSelection === "none") {
      setSelectedCountries(allCountries);
    } else {
      setSelectedCountries(
        allCountries.filter(
          (country) =>
            country.region.toLowerCase() === terms.regionSelection.toLowerCase()
        )
      );
    }

    if(terms.searchTerm) {
      setSelectedCountries((prevCountries) =>
        prevCountries.filter((country) =>
          country.name.common
            .toLowerCase()
            .startsWith(terms.searchTerm.toLowerCase().trim())
        )
      );
    }
  }, [terms]);

  return (
    <div className='flex flex-col items-center bg-gray-300 min-h-screen font-jost'>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home countries={selectedCountries} handleChange={handleChange}/>} />
        <Route path="/:countryCode" element={<Details countries={selectedCountries}/>} />
        {/* set up path for each detail page later */} 
      </Routes>
    </div>
  );
}

export default App;
