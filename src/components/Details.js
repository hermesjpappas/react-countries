import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactImageFallback from "react-image-fallback";
import Popup from "./Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWikipediaW } from "@fortawesome/free-brands-svg-icons";
import { MapContainer, TileLayer } from "react-leaflet";

export default function Details({ countries = [] }) {
  const [flagPopup, setFlagPopup] = useState(false);
  const [coaPopup, setCoaPopup] = useState(false);

  const { countryCode } = useParams();

  // Prevent crash if countries not loaded yet
  if (!Array.isArray(countries) || countries.length === 0) {
    return <div className="p-10 text-xl">Loading...</div>;
  }

  const country = countries.find(c => c.cca3 === countryCode);

  // Prevent crash if invalid route or refresh before data loads
  if (!country) {
    return <div className="p-10 text-xl">Loading...</div>;
  }

  function toggleFlag() {
    setFlagPopup(prev => {
      document.body.classList.toggle("overflow-hidden", !prev);
      return !prev;
    });
  }

  function toggleCoa() {
    setCoaPopup(prev => {
      document.body.classList.toggle("overflow-hidden", !prev);
      return !prev;
    });
  }

  /* =========================
     SAFE DATA PREPARATION
  ========================== */

  // Native names
  let nativeNames = { common: "none", official: "none" };

  if (country.name?.nativeName && country.languages) {
    const mainLanguage = Object.keys(country.languages)[0];
    nativeNames =
      country.name.nativeName?.[mainLanguage] || nativeNames;
  }

  // Currencies
  const currencyList =
    country.currencies && Object.keys(country.currencies).length > 0
      ? Object.values(country.currencies).map(
          cur => `${cur.name}${cur.symbol ? ` (${cur.symbol})` : ""}`
        )
      : ["none"];

  // Languages
  const languageList =
    country.languages && Object.keys(country.languages).length > 0
      ? Object.values(country.languages)
      : ["none"];

  /* =========================
     RENDER
  ========================== */

  return (
    <>
      {country.flags?.svg && (
        <Popup
          link={country.flags.svg}
          trigger={flagPopup}
          toggle={toggleFlag}
        />
      )}

      {country.coatOfArms?.svg && (
        <Popup
          link={country.coatOfArms.svg}
          trigger={coaPopup}
          toggle={toggleCoa}
        />
      )}

      <div className="z-0">
        <div className="w-[calc(100vw-1rem)] flex justify-start p-5">
          <Link to="/">
            <button className="px-6 py-2 text-gray-300 bg-gray-700 rounded shadow-md shadow-gray-700 dark:shadow-black">
              Home
            </button>
          </Link>
        </div>

        <div className="w-[calc(100vw-1rem)] flex flex-col items-center p-5 gap-4 text-gray-800 dark:text-gray-300">
          <div className="flex flex-wrap justify-center gap-6">
            {country.flags?.png && (
              <img
                className="rounded-md shadow-md cursor-pointer shadow-gray-700 dark:shadow-black max-h-40"
                src={country.flags.png}
                alt={`Flag of ${country.name?.common}`}
                onClick={toggleFlag}
              />
            )}

            <ReactImageFallback
              src={country.coatOfArms?.png}
              fallbackImage={"nothing"}
              alt={`Coat of Arms of ${country.name?.common}`}
              className="mb-6 cursor-pointer max-h-40"
              onClick={toggleCoa}
            />
          </div>

          <p className="flex items-center gap-6 text-4xl font-bold lg:text-5xl">
            {country.name?.common}
            <a
              href={`https://en.wikipedia.org/wiki/${country.name?.common}`}
              target="_blank"
              rel="noreferrer"
              className="pt-1 text-xl"
            >
              <span className="flex items-center justify-center p-2 text-black bg-gray-400 rounded-full">
                <FontAwesomeIcon icon={faWikipediaW} />
              </span>
            </a>
          </p>

          {country.name?.nativeName &&
            country.name.common !== nativeNames.common && (
              <p className="text-xl font-bold lg:text-2xl">
                Endonym: {nativeNames.common}
              </p>
            )}

          <div className="flex flex-col items-start gap-3 text-sm sm:text-base md:text-lg lg:text-xl">
            <p>
              <span className="font-bold">Official Name: </span>
              {country.name?.official}
            </p>

            {country.name?.nativeName &&
              country.name.official !== nativeNames.official && (
                <p>
                  <span className="font-bold">Official Endonym: </span>
                  {nativeNames.official}
                </p>
              )}

            <p>
              <span className="font-bold">Region: </span>
              {country.region || "None"}
            </p>

            <p>
              <span className="font-bold">Sub-Region: </span>
              {country.subregion || "None"}
            </p>

            <p>
              <span className="font-bold">
                {country.capital?.length > 1 ? "Capitals" : "Capital"}:{" "}
              </span>
              {country.capital?.join(", ") || "None"}
            </p>

            <p>
              <span className="font-bold">Population: </span>
              {country.population?.toLocaleString() || "Unknown"}
            </p>

            <p className="mb-6">
              <span className="font-bold">
                {languageList.length > 1 ? "Languages" : "Language"}:{" "}
              </span>
              {languageList.join(", ")}
            </p>
          </div>

          {/* MAP (only render if latlng exists) */}
          {country.latlng?.length === 2 && (
            <MapContainer
              key={`${country.latlng[0]}-${country.latlng[1]}-${countryCode}`}
              center={[country.latlng[0], country.latlng[1]]}
              zoom={6}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=dPukck0BML48sLppR0aY"
                attribution="&copy; MapTiler"
              />
            </MapContainer>
          )}
        </div>

        {/* Borders */}
        <div className="w-[calc(100vw-1rem)] flex flex-col items-center p-5 gap-4 text-gray-800 dark:text-gray-300 mb-24">
          <p className="self-center mt-6 font-bold">Borders with:</p>

          <div className="flex flex-wrap justify-center w-40 gap-4 sm:w-full">
            {country.borders?.length > 0
              ? country.borders.map(code => {
                  const linkCountry = countries.find(
                    c => c.cca3 === code
                  );

                  if (!linkCountry) return null;

                  return (
                    <Link
                      key={code}
                      to={`/${code}`}
                      className="flex flex-col items-center gap-2"
                    >
                      <img
                        src={linkCountry.flags?.png}
                        className="rounded-md shadow-md max-h-20 shadow-gray-700 dark:shadow-black"
                        alt={`Flag of ${linkCountry.name?.common}`}
                      />
                      <p className="font-bold">
                        {linkCountry.name?.common}
                      </p>
                    </Link>
                  );
                })
              : "None"}
          </div>
        </div>
      </div>
    </>
  );
}
