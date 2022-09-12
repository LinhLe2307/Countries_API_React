import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CountryCard from "./CountryCard";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.fav);
  const [favCountries, setFavCountries] = useState([]);
  const countries = useSelector((state) => state.countries.countries);

  useEffect(() => {
   
    const newList = countries.filter((country, i) =>
      country.name.common.indexOf(
        localStorage.getItem(country.name.common)) !== -1
      
    );
    setFavCountries(newList);

    // const newList = [];
    // for (let i = 0; i < localStorage.length; i++) {
    //   newList.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    // }
  
    // setFavCountries(newList);
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
