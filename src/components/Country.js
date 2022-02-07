import React from "react";

export default function Country() {
  return (
    <div className='flex flex-col w-full bg-gray-200 rounded-md shadow-md'>
      <img className='w-full rounded-t-md' src='https://flagcdn.com/gr.svg' />
      <div className="p-4 text-sm">
        <p className="text-xl font-bold pb-4">Greece</p>
        <p><span className="font-bold">Population:</span> 12,000,000</p>
        <p><span className="font-bold">Region:</span> Europe</p>
        <p><span className="font-bold">Capital:</span> Athens</p>
      </div>
    </div>
  );
}
