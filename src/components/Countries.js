import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import classes from "./Countries.module.css";
import { getAll } from "../fetchAPI";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading((prev) => !prev);
    getAll("https://restcountries.com/v3.1/all")
      .then((intialNotes) => {
        setFilterCountries(intialNotes);
        setCountries(intialNotes);
        setIsLoading((prev) => !prev);
      })
      .catch((error) => console.log(error));
  }, []);
  if (isLoading) {
    return <p>Loading</p>;
  }
  return (
    <div className={`${classes.container}`}>
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
