import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import classes from "./Countries.module.css";

const Countries = ({ filterCountries, countries, isLoading }) => {
  if (isLoading) {
    return <p>Loading</p>;
  }
  return (
    <div className={`${classes.container}`}>
      <div className={`${classes.countries}`}>
        {filterCountries.map((country, i) => (
          <CountryCard country={country} key={i} countries={countries} />
        ))}
      </div>
    </div>
  );
};

export default Countries;
