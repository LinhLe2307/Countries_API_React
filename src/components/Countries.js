import React, { useEffect } from "react";
import CountryCard from "./CountryCard";
import { useSelector, useDispatch } from "react-redux";
import {
  initializeCountries,
  search,
} from "../features/countries/countriesSlice";
import classes from "./Countries.module.css";

const Countries = () => {
  const countriesList = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  if (isLoading) {
    <p>Is loading</p>;
  }

  return (
    <div className={`${classes.container}`}>
      <div className={`${classes.countries}`}>
        {countriesList
          .filter((c) =>
            c.name.common.toLowerCase().includes(searchInput.toLowerCase())
          )
          .map((country, i) => (
            <CountryCard country={country} key={i}/>
          ))}
      </div>
    </div>
  );
};

export default Countries;
