import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeFavorites } from "../features/favorites/cartSlice";
import { getLocal } from "../services/local";
import CountryCard from "./CountryCard";
import classes from "./modules/Countries.module.css";

const Favorites = () => {

  const searchInput = useSelector((state) => state.countries.search);
  const favorites = useSelector((state) => state.favorites.fav);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeFavorites());
  }, [dispatch]);

  return (
    <div className={`${classes.container}`}>
      <div className={`${classes.countries}`}>
        {favorites
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
