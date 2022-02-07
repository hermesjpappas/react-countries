import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons'


export default function Header() {
  return <div className="flex items-center w-screen bg-white text-gray-700 p-3 shadow-md">
  {/* change above to flex justify-between when/if you put a dark mode button */}
    <div className="flex items-center justify-start gap-3">
      <FontAwesomeIcon icon={faGlobe} className="text-xl"/>
      <p className="pt-1 font-bold">Around The World</p>
    </div>
  </div>;
}
