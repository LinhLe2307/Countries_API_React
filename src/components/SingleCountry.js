import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import classes from "./SingleCountry.module.css";
import axios from "axios";
import { getAll } from "../fetchAPI";

const SingleCountry = () => {
  let location = useLocation();
  const { languages, name, currencies, flags, capital } =
    location.state.country;
  const [weather, setWeather] = useState([]);
  let api = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    // console.log(capital);
    const capitalList = capital.map((cap) => {
      return axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cap}&appid=${api}`
      );
    });
    Promise.all(capitalList)
      .then((res) => setWeather(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(weather);
  }, [weather]);

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
      {weather.map((weather, i) => (
        <div key={i}>
          <h1>Capital {weather.data.name}</h1>
          <div>
            {Object.entries(weather.data.main).map(([key, value], i) => (
              <li key={i}>
                {key} : {value}
              </li>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SingleCountry;
