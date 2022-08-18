import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import classes from "./SingleCountry.module.css";
import axios from "axios";

const SingleCountry = () => {
  let location = useLocation();
  const [weather, setWeather] = useState([]);
  const [borderCountries, setBorderCountries] = useState();

  const { languages, name, currencies, flags, capital, borders } =
    location.state.country;

  const countries = location.state.countries;

  let api = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    // console.log(location);
    // Get capital API
    const capitalList = capital.map((cap) => {
      return axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cap}&appid=${api}`
      );
    });
    Promise.all(capitalList)
      .then((res) => setWeather(res))
      .catch((err) => console.log(err));

    // get borders countries names
    if (borders) {
      const newBorderList = countries.filter((country) => {
        return borders.indexOf(country.cca3) !== -1;
      });

      setBorderCountries(newBorderList);
    }
  }, [location]);

  return (
    <div className={classes["single-card"]}>
      <h1>{name.common}</h1>
      <img src={flags.png} alt={`${name.common}`} />

      {/* ----------------LANGUAGES ------------------ */}
      <h2>Languages</h2>
      <ul>
        {languages &&
          Object.values(languages).map((language, i) => (
            <li key={i}>{language}</li>
          ))}
      </ul>

      {/* ----------------CURRENCIES ------------------ */}
      <h2>Currencies</h2>
      <ul>
        {currencies &&
          Object.values(currencies).map((currency, i) => (
            <li key={i}>{`${currency.name}`}</li>
          ))}
      </ul>

      {/* ----------------WEATHER ------------------ */}
      <h2>Weather</h2>
      {weather.map((weather, i) => (
        <div key={i}>
          <h3>Capital: {weather.data.name}</h3>
          <div>
            {Object.entries(weather.data.main).map(([key, value], i) => (
              <li key={i}>
                {key} : {value}
              </li>
            ))}
          </div>
        </div>
      ))}

      <h2>Borders</h2>
      {borderCountries
        ? borderCountries.map((borderCountry, i) => {
            const newBorderName = borderCountry.name.common.replaceAll(
              " ",
              "-"
            );
            return (
              <div key={i}>
                <Link
                  to={`/countries/${newBorderName}`}
                  state={{
                    country: borderCountry,
                    countries: location.state.countries,
                  }}
                >
                  {borderCountry.name.common}
                </Link>
              </div>
            );
          })
        : "No borders"}
    </div>
  );
};

export default SingleCountry;
