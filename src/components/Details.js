import React from "react";
import { Link, useParams } from "react-router-dom";
import ReactImageFallback from "react-image-fallback";
import notAvailable from '../images/not_available.png';

export default function Details({ countries }) {
  //get the country code from the URL
  const { countryCode } = useParams();

  //use the country code to get the right object to display from state
  const country = countries.find((country) => country.cca3 === countryCode);

  //basically all these conditionals are because Antarctica
  //doesn't have some of these values

  let nativeNames = { common: "none", official: "none" };

  if (country.name.nativeName) {
    const mainLanguage = Object.keys(country.languages)[0];
    const nativeName = country.name.nativeName;
    nativeNames = nativeName[mainLanguage];
  }

  let currencyList = ["none"];

  if (country.currencies) {
    const currencyKeys = Object.keys(country.currencies);
    const currencies = country.currencies;
    currencyList = currencyKeys.map((key) => {
      return `${currencies[key]["name"]} (${currencies[key]["symbol"]})`;
    });
  }

  let languageList = ["none"];

  if (country.languages) {
    const languageKeys = Object.keys(country.languages);
    languageList = languageKeys.map((key) => {
      return `${country.languages[key]}`;
    });
  }

  return (
    <React.Fragment>
      <Link to='/' className='w-full'>
        <div className='w-full flex justify-start p-5'>
          <button className='bg-gray-700 text-gray-300 px-6 py-2 rounded shadow-md shadow-gray-700'>
            Home
          </button>
        </div>
      </Link>
      <div className='flex flex-col items-center p-5 gap-4 text-gray-800'>
        <div className='flex flex-wrap gap-6 justify-center'>
          <a href={country.flags.svg} target='_blank'>
            <img
              className='rounded-md shadow-md shadow-gray-700 max-h-40'
              src={country.flags.png}
              alt={"Flag of " + country.name.common}
            />
          </a>
          <ReactImageFallback
            src={country.coatOfArms.png}
            fallbackImage={'nothing'}
            alt={"Coat of Arms of " + country.name.common}
            className='max-h-40 mb-6'
          />
          
        </div>

        <p className='font-bold text-4xl lg:text-5xl'>{country.name.common}</p>

        <p className='font-bold text-xl lg:text-2xl'>
          {country.name.nativeName &&
            country.name.common !== nativeNames.common &&
            `Endonym: ${nativeNames.common}`}
        </p>

        <div className='flex flex-col items-start text-sm gap-3 sm:text-base md:text-lg lg:text-xl'>
          <p>
            <span className='font-bold'>Official Name: </span>
            {country.name.official}
          </p>
          <p>
            <span className='font-bold'>
              {country.name.nativeName &&
              country.name.official !== nativeNames.official
                ? "Official Endonym: "
                : ""}
            </span>
            {country.name.nativeName &&
            country.name.official !== nativeNames.official
              ? nativeNames.official
              : ""}
          </p>
          <p>
            <span className='font-bold'>Region: </span>
            {country.region}
          </p>
          <p>
            <span className='font-bold'>Sub-Region: </span>
            {country.subregion ? country.subregion : "None"}
          </p>
          <p>
            <span className='font-bold'>
              {country.capital && country.capital.length > 1
                ? "Capitals"
                : "Capital"}
              :{" "}
            </span>
            {country.capital ? country.capital.join(", ") : "None"}
          </p>
          <p>
            <span className='font-bold'>Landlocked: </span>
            {country.landlocked ? "Yes" : "No"}
          </p>
          <p>
            <span className='font-bold'>Population: </span>
            {country.population.toLocaleString()}
          </p>
          <p>
            <span className='font-bold'>Independent: </span>
            {country.independent ? "Yes" : "No"}
          </p>
          <p>
            <span className='font-bold'>Status: </span>
            {country.status}
          </p>
          <p>
            <span className='font-bold'>UN Member: </span>
            {country.unMember ? "Yes" : "No"}
          </p>
          <p>
            <span className='font-bold'>Currencies: </span>
            {currencyList.join(", ")}
          </p>
          <p>
            <span className='font-bold'>Languages: </span>
            {languageList.join(", ")}
          </p>
          <p className='font-bold mt-6 self-center'>Borders with: </p>
        </div>
        <div className='flex flex-wrap justify-center gap-4 w-40 sm:w-full'>
          {country.borders
            ? country.borders.map((code) => {
                const linkCountry = countries.find(
                  (country) => country.cca3 === code
                );
                return (
                  <Link
                    key={code}
                    to={"/" + code}
                    className='flex flex-col items-center gap-2'
                  >
                    <img
                      src={linkCountry.flags.png}
                      className='max-h-20 rounded-md'
                      alt={"Flag of " + linkCountry.name.common}
                    />
                    <p className='font-bold'>{linkCountry.name.common}</p>
                  </Link>
                );
              })
            : "None"}
        </div>
      </div>
    </React.Fragment>
  );
}
