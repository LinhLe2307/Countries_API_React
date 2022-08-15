import React, { useEffect, useState } from "react";
import { getAll } from "../fetchAPI";
import CountryCard from "./CountryCard";
import classes from "./Countries.module.css";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    console.log(e.target.value);
    const newCountriesList = countries.filter(
      (country) =>
        country.name.common.toLowerCase().indexOf(e.target.value) !== -1
    );
    setSearchInput(e.target.value);
    setFilterCountries(newCountriesList);
  };
  useEffect(() => {
    getAll("https://restcountries.com/v3.1/all")
      .then((intialNotes) => {
        setFilterCountries(intialNotes);
        setCountries(intialNotes);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <input defaultValue={searchInput} onChange={(e) => handleSearch(e)} />
      <div className={`${classes.countries}`}>
        {filterCountries.map((country, i) => (
          <CountryCard country={country} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Countries;
