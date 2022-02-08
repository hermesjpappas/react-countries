import React from "react";
import { Link, useParams } from "react-router-dom";

export default function Details({ countries }) {
  const { countryCode } = useParams();

  const country = countries.find((country) => country.cca3 === countryCode);

  const mainLanguage = Object.keys(country.languages)[0];
  const nativeName = country.name.nativeName;
  const nativeNames = nativeName[mainLanguage];



  return (
    <React.Fragment>
      <Link to='/' className='w-full'>
        <div className='w-full flex justify-start p-5'>
          <button className='bg-gray-700 text-gray-300 px-6 py-2 rounded shadow-md shadow-gray-700'>
            Home
          </button>
        </div>
      </Link>
      <div className='flex flex-col items-center p-5 gap-4 text-gray-800'>
        <img
          className='rounded-md shadow-md shadow-gray-700'
          src={country.flags.svg}
        />
        <p className='font-bold text-4xl'>{country.name.common}</p>

  
        <p className='font-bold text-xl'>{
          country.name.common !== nativeNames.common &&
          `Endonym: ${nativeNames.common}`
          }</p>

        <div className='flex flex-col items-start text-sm'>
          <p>
            <span className='font-bold'>Official Name: </span>
            {country.name.official}
          </p>
          <p>
            <span className='font-bold'>Official Endonym: </span>
            {nativeNames.official}
          </p>
          <p>
            <span className='font-bold'>Region: </span>
            {country.region}
          </p>
          <p>
            <span className='font-bold'>Sub-Region: </span>
            {country.subregion}
          </p>
          <p>
            <span className='font-bold'>
              {country.capital && country.capital.length > 1
                ? "Capitals"
                : "Capital"}
              :{" "}
            </span>
            {country.capital ? country.capital.join(", ") : "None"}
          </p>
          <p>
            <span className='font-bold'>Population: </span>
            {country.population.toLocaleString()}
          </p>
          <p>
            <span className='font-bold'>Independent: </span>
            {country.independent ? "Yes" : "No"}
          </p>
          <p>
            <span className='font-bold'>Status: </span>
            {country.status}
          </p>
          <p>
            <span className='font-bold'>UN Member: </span>
            {country.unMember ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
