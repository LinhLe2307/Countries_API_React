import React, { useEffect, useState } from "react";
import { getAll } from "../fetchAPI";
import SingleCountry from "./SingleCountry";
import classes from "./Countries.module.css"

const Countries = () => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    getAll("https://restcountries.com/v3.1/all").then((intialNotes) => {
      //   console.log(intialNotes);
      setCountries(intialNotes);
    });
  }, []);
  return (
    <div className={`${classes.countries}`}>
      {countries.map((country, i) => (
        <SingleCountry country={country} key={i} />
      ))}
    </div>
  );
};

export default Countries;
