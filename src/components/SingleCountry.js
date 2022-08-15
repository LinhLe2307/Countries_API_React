import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import classes from "./SingleCountry.module.css";
import { getAll } from "../fetchAPI";

const SingleCountry = () => {
  let location = useLocation();
  const { languages, name, currencies, flags } = location.state.country;
  const [weather, setWeather] = useState();
  useEffect(() => {
    let api = process.env.REACT_APP_API_KEY;
    console.log(api);

    getAll(
      `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${api}`
    )
      .then((initialNotes) => console.log(initialNotes))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes["single-card"]}>
      <h1>{name.common}</h1>
      <img src={flags.png} />
      <ul>
        Languages{" "}
        {languages &&
          Object.values(languages).map((language, i) => (
            <li key={i}>{language}</li>
          ))}
      </ul>
      <ul>
        Currencies{" "}
        {currencies &&
          Object.values(currencies).map((currency, i) => (
            <li key={i}>{`${currency.name}`}</li>
          ))}
      </ul>
    </div>
  );
};

export default SingleCountry;
