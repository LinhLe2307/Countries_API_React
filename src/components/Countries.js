import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import classes from "./Countries.module.css";
import { getAll } from "../fetchAPI";
import { TextField } from "@mui/material";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    const newCountriesList = countries.filter(
      (country) =>
        country.name.common
          .toLowerCase()
          .indexOf(e.target.value.toLowerCase()) !== -1
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
      <TextField
        defaultValue={searchInput}
        onChange={(e) => handleSearch(e)}
        label="Search"
        color="secondary"
        focused
      />
      <div className={`${classes.countries}`}>
        {filterCountries.map((country, i) => (
          <CountryCard country={country} key={i} countries={countries} />
        ))}
      </div>
    </div>
  );
};

export default Countries;
