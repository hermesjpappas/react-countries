import React from "react";

function Footer() {
  return (
    <div className='w-full mt-12 p-4 flex flex-col items-center bg-gray-700 text-gray-400 absolute bottom-0'>
      <p className="text-sm sm:text-base">Design and code by <a  className=" text-white" href="https://github.com/hermesjpappas/" target="_blank">Hermes J. Pappas</a></p>
      <p className='text-xs sm:text-sm'>
        Data provided by the <a className=" text-white" href='https://restcountries.com/' target="_blank">REST Countries API</a>
      </p>
    </div>
  );
}

export default Footer;
