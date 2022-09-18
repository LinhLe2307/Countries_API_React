import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import CountryCard from "./CountryCard";
import {
  initializeCountries,
  search,
  getCountries,
} from "../features/countries/countriesSlice";
import classes from "./modules/Countries.module.css";
import { getLocal } from "../services/local";

const Countries = () => {
  // const [displayedList, setDisplayedList] = useState([]);
  const favorites = useSelector((state) => state.favorites.fav);
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
            <CountryCard country={country} key={i} />
          ))}
      </div>
    </div>
  );
};

export default Countries;
