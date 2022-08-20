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

  
  useEffect(() => {
    let api = process.env.REACT_APP_API_KEY;
    console.log(capital);
    // Get capital API
      const capitalList = capital.map((cap) => {
        return axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cap}&appid=${api}`
          );
        });
        Promise.all(capitalList)
        .then((res) => setWeather(res))
        .catch((err) => axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${name.common}&appid=${api}`
          ).then((res) => setWeather([res]))
          .catch((err) => console.log(err)))
        
    
    
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
      <div className={classes["card"]}>
      <h1>{name.common}</h1>
      <img src={flags.png} alt={`${name.common}`} />

      <div className={classes.context}>
        {/* ----------------LANGUAGES ------------------ */}
        <ul>
        <h3>Languages</h3>
          {languages &&
            Object.values(languages).map((language, i) => (
              <li key={i}>{language}</li>
            ))}
        </ul>

        {/* ----------------CURRENCIES ------------------ */}
        <ul>
        <h3>Currencies</h3>
          {currencies &&
            Object.values(currencies).map((currency, i) => (
              <li key={i}>{`${currency.name}`}</li>
            ))}
        </ul>

        <ul>
          <h3>Borders</h3>
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
          </ul>
      </div>
      {/* ----------------WEATHER ------------------ */}
      <h2>Weather</h2>
      {weather.map((weather, i) => (
        <div key={i}>
          <h3>{weather.data.name === name.common ? "Country" : "Capital"} : {weather.data.name}</h3>
          <div>
            {weather.data.weather.map((obj, i) => (
              <li key={i}>
                {obj.main}
                {obj.description}
                <img src={`https://openweathermap.org/img/wn/${obj.icon}@2x.png`}/>
              </li>
            ))}
          </div>
        </div>
      ))}

      
    </div>
    </div>
  );
};

export default SingleCountry;
