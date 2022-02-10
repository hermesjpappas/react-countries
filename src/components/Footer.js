import React from "react";

function Footer() {
  return (
    <div className='w-full mt-12 p-4 flex flex-col items-center bg-gray-700 text-gray-400 absolute bottom-0'>
      <p>Design and code by <a  className=" text-white" href="">Hermes J. Pappas</a></p>
      <p className='text-sm'>
        Data provided by the <a className=" text-white" href='https://restcountries.com/'>REST Countries API</a>
      </p>
    </div>
  );
}

export default Footer;
