import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLocal } from "../services/local";
import CountryCard from "./CountryCard";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.fav);
  const [favCountries, setFavCountries] = useState([]);

  useEffect(() => {
    setFavCountries(getLocal);
  }, [favorites]);
  return (
    <>
      {favCountries.map((country) => (
        <CountryCard country={country} key={country.name.common} />
      ))}
    </>
  );
};

export default Favorites;
