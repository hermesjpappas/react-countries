import React from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  const params = useParams();
  return (
    <div>
      <p>I am displaying country {params.countryCode}</p>
    </div>
  );
}
