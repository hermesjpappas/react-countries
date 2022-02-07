import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function Country({country}) {
  return (
    <div className='flex flex-col w-60 sm:w-72 md:w-80 bg-gray-200 rounded-md shadow-lg'>
      <img className='w-full h-1/2 rounded-t-md' src={country.flags.png} />
      <div className="h-1/2 p-4 text-sm flex flex-col justify-center">
        <p className="text-xl font-bold pb-4">{country.name.common}</p>
        <p><span className="font-bold">Population:</span> {country.population}</p>
        <p><span className="font-bold">Region:</span> {country.region}</p>
        <p><span className="font-bold">{country.capital && country.capital.length > 1 ? "Capitals" : "Capital"}: </span> 
        {country.capital ? country.capital.join(", ") : "None"}</p>
      </div>
    </div>
  );
}
