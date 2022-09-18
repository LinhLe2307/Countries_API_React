import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import { useSelector, useDispatch } from "react-redux";
import {
  initializeCountries,
  search,
} from "../features/countries/countriesSlice";
import { getLocal } from "../services/local";
import classes from "./Countries.module.css";

const Countries = () => {
  const [displayedList, setDisplayedList] = useState([]);
  // const favorites = useSelector((state) => state.favorites.fav);
  const countriesList = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCountries());
    setDisplayedList(countriesList);
  }, [dispatch]);

  // useEffect(() => {
  //   const newList = countriesList.map((country) => {
  //     const selectedCountry = getLocal().find(
  //       (visitedCountry) => visitedCountry.name.common === country.name.common
  //     );
  //     return selectedCountry !== undefined
  //       ? { ...country, isChecked: true }
  //       : { ...country, isChecked: false };
  //   });
  //   setDisplayedList(newList);
  // }, [favorites]);

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
