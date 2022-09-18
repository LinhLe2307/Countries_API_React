import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLocal } from "../services/local";
import CountryCard from "./CountryCard";
import classes from "./modules/Countries.module.css";

const Favorites = () => {
  const [favCountries, setFavCountries] = useState([]);

  const searchInput = useSelector((state) => state.countries.search);
  const favorites = useSelector((state) => state.favorites.fav);

  useEffect(() => {
    setFavCountries(getLocal);
  }, [favorites]);
  return (
    <div className={`${classes.container}`}>
      <div className={`${classes.countries}`}>
        {favCountries
          .filter((c) =>
            c.name.common.toLowerCase().includes(searchInput.toLowerCase())
          )
          .map((country) => (
            <CountryCard country={country} key={country.name.common} />
          ))}
      </div>
    </div>
  );
};

export default Favorites;
