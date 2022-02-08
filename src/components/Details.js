import React from "react";
import { useParams } from "react-router-dom";

export default function Details({countries}) {
  const {countryCode} = useParams();

  const country = countries.find(country => country.cca3 === countryCode);

  return (
    <div>
      <p>I am displaying {country.name.common}</p>
    </div>
  );
}
