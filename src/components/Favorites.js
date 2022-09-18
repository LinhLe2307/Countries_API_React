import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLocal } from "../services/local";
import CountryCard from "./CountryCard";
import classes from "./Countries.module.css";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.fav);
  const [favCountries, setFavCountries] = useState([]);

  useEffect(() => {
    setFavCountries(getLocal);
  }, [favorites]);
  return (
    <div className={`${classes.container}`}>
      <div className={`${classes.countries}`}>
        {favCountries.map((country) => (
          <CountryCard country={country} key={country.name.common} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
