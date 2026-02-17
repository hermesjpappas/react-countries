import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Details from "./components/Details";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [terms, setTerms] = useState({
    searchTerm: "",
    regionSelection: "all",
  });

  //get the data from the REST Countries API
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca3,latlng,region,subregion,capital,borders,population,languages")
      .then(response => response.json())
      .then(data => {
        setAllCountries(data);
        setSelectedCountries(data);
      })
      .catch(err => console.log(err));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setTerms(prevTerms => {
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
        allCountries.filter(country => country.region.toLowerCase() === terms.regionSelection.toLowerCase())
      );
    }

    //system where only the beginnings of parts of the name are tested
    //so that we don't type in "ge" and get "Algeria", but rather we
    //type in "con" and get "DR Congo"
    //we can also match the entire name with the first if statement

    if (terms.searchTerm) {
      setSelectedCountries(prevCountries =>
        prevCountries.filter(country => {
          const name = country.name.common.toLowerCase();

          //filter out parentheses, comma, dash and diacritics in the name for easier search
          const filtName = country.name.common
            .toLowerCase()
            .replace(/[\-\(\)\,]+/g, " ")
            .replace(/  +/g, " ")
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "");

          const search = terms.searchTerm
            .toLowerCase()
            .replace(/[\-\(\)\,]+/g, " ")
            .replace(/  +/g, " ")
            .trim();

          //check against the entire thing first
          if (name.startsWith(search)) return true;
          if (filtName.startsWith(search)) return true;

          //check against its parts, first "pure" ones
          const pureParts = name
            .replace(/[\-\(\)\,]+/g, " ")
            .replace(/  +/g, " ")
            .split(" ");
          for (let part of pureParts) {
            if (part.startsWith(search)) return true;
          }

          //then filtered from diacritics
          const filtParts = filtName.split(" ");
          for (let part of filtParts) {
            if (part.startsWith(search)) return true;
          }
          return false;
        })
      );
    }
  }, [terms]);

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gray-300 dark:bg-gray-800 font-jost">
      <Header />
      <ScrollToTop>
        <Routes>
          {/* we pass only the selected countries down to Home because we want
          the displayed countries to change as we select a region or search */}

          <Route
            exact
            path="/"
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
            path="/:countryCode"
            element={<Details countries={allCountries} />}
          />
        </Routes>
      </ScrollToTop>
      <Footer />
    </div>
  );
}

export default App;
