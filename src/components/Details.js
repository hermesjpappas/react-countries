import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactImageFallback from "react-image-fallback";
import Popup from "./Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWikipediaW } from "@fortawesome/free-brands-svg-icons";
import { MapContainer, TileLayer } from "react-leaflet";


export default function Details({ countries }) {
  const [flagPopup, setFlagPopup] = useState(false);
  const [coaPopup, setCoaPopup] = useState(false);

  //'overflow-hidden' in both hides the scroll bar of the normal page
  //while the pop up is active, then it goes back to normal

  //function to set the visibility of the pop up for the flag
  function toggleFlag() {
    setFlagPopup((prevStatus) => {
      if (prevStatus) {
        document.body.classList.remove("overflow-hidden");
        return false;
      } else {
        document.body.classList.add("overflow-hidden");
        return true;
      }
    });
  }

  //function to set the visibility of the pop up for the coat of arms
  function toggleCoa() {
    setCoaPopup((prevStatus) => {
      if (prevStatus) {
        document.body.classList.remove("overflow-hidden");
        return false;
      } else {
        document.body.classList.add("overflow-hidden");
        return true;
      }
    });
  }

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

  //use the country object to display the necessary data for this country
  return (
    <React.Fragment>
      <Popup link={country.flags.svg} trigger={flagPopup} toggle={toggleFlag} />
      <Popup
        link={country.coatOfArms.svg}
        trigger={coaPopup}
        toggle={toggleCoa}
      />
      <div className='z-0'>
        <div className='w-[calc(100vw-1rem)] flex justify-start p-5'>
          <Link to='/'>
            <button className='bg-gray-700 text-gray-300 px-6 py-2 rounded shadow-md shadow-gray-700 dark:shadow-black'>
              Home
            </button>
          </Link>
        </div>

        <div className='w-[calc(100vw-1rem)] flex flex-col items-center p-5 gap-4 text-gray-800 dark:text-gray-300'>
          <div className='flex flex-wrap gap-6 justify-center'>
            <img
              className='rounded-md shadow-md shadow-gray-700 dark:shadow-black max-h-40 cursor-pointer'
              src={country.flags.png}
              alt={"Flag of " + country.name.common}
              onClick={toggleFlag}
            />
            <ReactImageFallback
              src={country.coatOfArms.png}
              fallbackImage={"nothing"}
              alt={"Coat of Arms of " + country.name.common}
              className='max-h-40 mb-6 cursor-pointer'
              onClick={toggleCoa}
            />
          </div>

          <p className='font-bold text-4xl lg:text-5xl flex gap-6 items-center'>
            {country.name.common + " "}
            <a
              href={"https://en.wikipedia.org/wiki/" + country.name.common}
              target='_blank'
              className='text-xl pt-1'
            >
              <span className='bg-gray-400 text-black p-2 rounded-full flex justify-center items-center'>
                <FontAwesomeIcon icon={faWikipediaW} />
              </span>
            </a>
          </p>

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
            {country.name.nativeName &&
            country.name.official !== nativeNames.official ? (
              <p>
                <span className='font-bold'>Official Endonym :</span>{" "}
                {nativeNames.official}
              </p>
            ) : (
              ""
            )}
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
              <span className='font-bold'>
                {currencyList.length > 1 ? "Currencies" : "Currency"}:{" "}
              </span>
              {currencyList.join(", ")}
            </p>
            <p className='mb-6'>
              <span className='font-bold'>
                {languageList.length > 1 ? "Languages" : "Language"}:{" "}
              </span>
              {languageList.join(", ")}
            </p>
          </div>
           <MapContainer
            //need to have the key change so the map re-renders!
            key={country.latlng[0] + country.latlng[1] + countryCode}
            center={[country.latlng[0], country.latlng[1]]}
            zoom={6}
          >
            <TileLayer
              url='https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=dPukck0BML48sLppR0aY'
              attribution="Provided by <a href='https://cloud.maptiler.com/'>MapTiler</a>"
            ></TileLayer>
          </MapContainer>

        </div>

           
        <div className='w-[calc(100vw-1rem)] flex flex-col items-center p-5 gap-4 text-gray-800 dark:text-gray-300 mb-24'>
         <p className='font-bold mt-6 self-center'>Borders with: </p>
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
                        className='max-h-20 rounded-md shadow-md shadow-gray-700 dark:shadow-black'
                        alt={"Flag of " + linkCountry.name.common}
                      />
                      <p className='font-bold'>{linkCountry.name.common}</p>
                    </Link>
                  );
                })
              : "None"}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
