import React, { useState } from "react";
import Country from "./Country";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Home({ countries, handleChange, terms }) {
  //sort the countries by name
  const sortedCountries = Array.isArray(countries)
    ? [...countries].sort((a, b) => {
        const nameA = a.name.common.toUpperCase();
        const nameB = b.name.common.toUpperCase();
        return nameA.localeCompare(nameB);
      })
    : [];

  return (
    <div className="flex flex-col items-center w-full mb-24">
      <div className="flex justify-between w-full p-2 sm:p-4 lg:px-20">
        <div className="relative">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute pb-1 text-gray-400 top-2 left-1 sm:text-xl sm:top-3 sm:left-3"
          />
          <input
            className="p-1 pl-6 text-sm text-gray-700 bg-white rounded shadow-lg dark:bg-gray-600 dark:text-gray-300 w-44 sm:h-10 sm:w-96 sm:text-base sm:pl-10 focus:outline-none"
            type="text"
            placeholder="search country"
            name="searchTerm"
            value={terms.searchTerm}
            onChange={handleChange}
          />
        </div>
        <select
          name="regionSelection"
          value={terms.regionSelection}
          onChange={handleChange}
          className="px-1 text-xs text-gray-700 bg-white rounded shadow-lg dark:bg-gray-600 dark:text-gray-300 sm:w-28 sm:text-center sm:text-base focus:outline-none"
        >
          <option value="all">All Regions</option>
          <option value="africa">Africa</option>
          <option value="americas">Americas</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>

      {/* map the selected countries to individual Country components on the page */}

      <div className="flex flex-wrap justify-center gap-6 p-2 text-xl text-gray-400 md:text-3xl lg:text-6xl">
        {sortedCountries?.length >= 1
          ? sortedCountries?.map(country => {
              return (
                <Country
                  key={country.cca3}
                  country={country}
                />
              );
            })
          : "No countries found"}
      </div>
    </div>
  );
}
