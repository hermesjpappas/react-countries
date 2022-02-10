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

    if (terms.searchTerm) {
      setSelectedCountries((prevCountries) =>
        prevCountries.filter((country) => {
          const parts = country.name.common.split(" ");
          for (let part of parts) {
            if (
              part
                .toLowerCase()
                .startsWith(terms.searchTerm.toLowerCase().trim())
            ) {
              return true;
            }
          }
          return false;
        })
      );
    }
  }, [terms]);

  return (
    <div className='flex flex-col items-center bg-gray-300 min-h-screen font-jost relative'>
      <Header />
      <Routes>
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
