import React from "react";
import Country from "./Country";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div>
      {/*searchbar and dropdown*/}
      <div className='w-screen flex justify-between p-2'>
        <div className="relative">
        <FontAwesomeIcon icon={faSearch} className="text-gray-400 absolute top-2 left-1 pb-1"/>
          <input
            className='text-sm p-1 pl-6 rounded w-44 shadow-md'
            type='text'
            placeholder='search country'
          />
        </div>
        <select className='text-xs rounded bg-white shadow-md'>
          <option value=''>Region</option>
          <option value='africa'>Africa</option>
          <option value='americas'>Americas</option>
          <option value='asia'>Asia</option>
          <option value='europe'>Europe</option>
          <option value='oceania'>Oceania</option>
        </select>
      </div>
      <div>
        <Country />
        {/* map data to country components*/}
      </div>
    </div>
  );
}
