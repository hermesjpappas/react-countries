import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import  useDarkMode  from '../useDarkMode';

export default function Header() {

  const [darkMode, toggleDarkMode] = useDarkMode();


  return (
    <div className='flex w-full justify-between items-center bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-300 p-3 shadow-lg lg:p-6'>
      {/* change above to flex justify-between when/if you put a dark mode button */}
      <Link to='/'>
        <div className='flex items-center justify-start gap-3'>
          <FontAwesomeIcon
            icon={faGlobe}
            className='text-xl md:text-2xl lg:text-3xl'
          />
          <p className='pt-1 font-bold md:text-xl lg:text-2xl'>
            Around The World
          </p>
        </div>
      </Link>

      <div className="pt-1 pr-1">
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} 
            className="text-lg md:text-xl lg:text-2xl cursor-pointer"
            onClick={toggleDarkMode}
          />
        </div>
    </div>
  );
}
