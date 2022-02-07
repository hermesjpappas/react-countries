import React from "react";
import Country from "./Country";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Home(props) {

  //sort the countries by name
  props.countries.sort((a,b) => {
    let nameA = a.name.common.toUpperCase();
    let nameB = b.name.common.toUpperCase();

    return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
  });

  return (
    <div className="w-full flex flex-col items-center">
      <div className='w-full flex justify-between p-2'>
        <div className="relative">
        <FontAwesomeIcon icon={faSearch} className="text-gray-400 absolute top-2 left-1 pb-1"/>
          <input
            className='text-sm p-1 pl-6 rounded w-44 shadow-md'
            type='text'
            placeholder='search country'
          />
        </div>
        <select className='text-xs rounded bg-white shadow-md px-1'>
          <option value=''>Region</option>
          <option value='africa'>Africa</option>
          <option value='americas'>Americas</option>
          <option value='asia'>Asia</option>
          <option value='europe'>Europe</option>
          <option value='oceania'>Oceania</option>
        </select>
      </div>
      <div className="p-2 flex flex-wrap gap-6 justify-center">

        {props.countries.map(country => {
          return (
            <Country key={country.cca3} country={country}/>
          )
        })}

      </div>
    </div>
  );
}
