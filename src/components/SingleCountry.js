import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "./SingleCountry.module.css";

const SingleCountry = () => {
  let location = useLocation();
  const languages = location.state.languages;
  const currencies = location.state.currencies;
  const name = location.state.name;
  return (
    <div className={classes["single-card"]}>
      <h1>{name.common}</h1>
      <ul>
        Languages {languages &&
          Object.values(languages).map((language, i) => (
            <li key={i}>{language}</li>
          ))}
      </ul>
      <ul>
        Currencies {currencies &&
          Object.values(currencies).map((currency, i) => (
            <li key={i}>{`${currency.name}`}</li>
          ))}
      </ul>
    </div>
  );
};

export default SingleCountry;
