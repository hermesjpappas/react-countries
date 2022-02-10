import React from 'react'

function Popup({link, trigger, toggle}) {
  return trigger ? (
    <div className="z-10 fixed top-0 left-0 w-full h-full bg-gray-500/80 flex flex-col items-center">
      <div className="relative p-8 w-full max-w-6xl flex flex-col items-center gap-6">
          <button onClick={toggle} className='bg-gray-700 text-gray-300 px-6 py-2 rounded shadow-md shadow-gray-700 self-start'>Close</button>
          <img src={link}/>
      </div>
    </div>
  ) : "";
    }

export default Popup