import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Details from "./components/Details";
import Footer from "./components/Footer";

function App() {

  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [terms, setTerms] = useState({
    searchTerm: "",
    regionSelection: "all",
  });

  //get the data from the REST Countries API
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


  //run this every time there is a change in the region or the search bar

  useEffect(() => {
    //if there is a region selection, limit it to that

    if (terms.regionSelection === "all") {
      setSelectedCountries(allCountries);
    } else {
      setSelectedCountries(
        allCountries.filter(
          (country) =>
            country.region.toLowerCase() === terms.regionSelection.toLowerCase()
        )
      );
    }

    //system where only the beginnings of parts of the name are tested
    //so that we don't type in "ge" and get "Algeria", but rather we
    //type in "con" and get "DR Congo"
    //we can also match the entire name with the first if statement

    if (terms.searchTerm) {
      setSelectedCountries((prevCountries) =>
        prevCountries.filter((country) => {
          const name = country.name.common.toLowerCase();
          const search = terms.searchTerm.toLowerCase().trim();

          if(name.startsWith(search)) return true
          const parts = name.split(" ");
          for (let part of parts) {
            if (part.startsWith(search))  return true;
          }
          return false;
        })
      );
    }
  }, [terms]);

  return (
    <div className='flex flex-col items-center bg-gray-300 dark:bg-gray-800 min-h-screen font-jost relative'>
      <Header />
      <Routes>
      
        {/* we pass only the selected countries down to Home because we want
          the displayed countries to change as we select a region or search */}
        <Route
          exact
          path='/'
          element={
            <Home
              countries={selectedCountries}
              handleChange={handleChange}
              terms={terms}
            />
          }
        />
        {/* we pass all the countries to the details page because it needs 
        to have the data for the countries it borders with */}
        <Route
          path='/:countryCode'
          element={<Details countries={allCountries} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
