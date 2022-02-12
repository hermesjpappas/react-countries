import React from 'react'

function Popup({link, trigger, toggle}) {
  return trigger ? (
    <div className="z-10 fixed top-0 left-0 w-screen h-screen bg-gray-500/90 flex flex-col items-center overflow-auto">
      <div className="relative p-8 w-full max-w-6xl flex flex-col items-center gap-6 max-h-full">
          <button onClick={toggle} className='bg-gray-700 text-gray-300 px-6 py-2 rounded shadow-md shadow-gray-700 self-start'>Close</button>
          <img src={link} className="max-h-[calc(100%-8rem)]"/>
      </div>
    </div>
  ) : "";
    }

export default Popup