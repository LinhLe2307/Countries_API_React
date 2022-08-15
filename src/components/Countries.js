import React, { useState } from "react";
import { getAll } from "../fetchAPI";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  getAll("https://restcountries.com/#api-endpoints-v3-all").then(
    (intialNotes) => setCountries(intialNotes)
  );
  return <div>Countries</div>;
};

export default Countries;
