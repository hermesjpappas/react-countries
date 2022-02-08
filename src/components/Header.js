import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons'


export default function Header() {
  return <div className="flex w-full items-center bg-white text-gray-700 p-3 shadow-lg lg:p-6">
  {/* change above to flex justify-between when/if you put a dark mode button */}
    <Link to="/">
      <div className="flex items-center justify-start gap-3">
        <FontAwesomeIcon icon={faGlobe} className="text-xl md:text-2xl lg:text-3xl"/>
        <p className="pt-1 font-bold md:text-xl lg:text-2xl">Around The World</p>
      </div>
    </Link>
  </div>;
}
