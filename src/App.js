import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import europe from "./tests/europe";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [terms, setTerms] = useState({
    searchTerm: "",
    regionSelection: "",
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

  function checkStart(search, str) {
    const lowerSearch = search.toLowerCase();
    const lowerStr = str.toLowerCase();
    return lowerStr.startsWith(lowerSearch);
  }

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
    if (terms.regionSelection === "none") setSelectedCountries(allCountries);
    else {
      setSelectedCountries(
        allCountries.filter(
          (country) =>
            country.region.toLowerCase() === terms.regionSelection.toLowerCase()
        )
      );
    }

    if (terms.searchTerm) {
      setSelectedCountries((prevCountries) =>
        prevCountries.filter((country) =>
          country.name.common
            .toLowerCase()
            .startsWith(terms.searchTerm.toLowerCase())
        )
      );
    }
  }, [terms]);

  return (
    <div className='flex flex-col items-center bg-gray-300 font-jost'>
      <Header />
      <Home countries={selectedCountries} handleChange={handleChange} />
    </div>
  );
}

export default App;
