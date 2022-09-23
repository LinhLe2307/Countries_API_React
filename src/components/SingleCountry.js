import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

import classes from "./modules/SingleCountry.module.css";

const SingleCountry = () => {
  let location = useLocation();
  const [weathers, setWeathers] = useState([]);
  const [borderCountries, setBorderCountries] = useState([]);
  const navigate = useNavigate();
  const countries = useSelector((state) => state.countries.countries);

  const { languages, name, currencies, flags, capital, borders } =
    location.state.country;

  useEffect(() => {
    let api = process.env.REACT_APP_API_KEY;
    // Get capital API
    const capitalList = capital.map((cap) => {
      return axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cap}&appid=${api}`
      );
    });
    Promise.all(capitalList)
      .then((res) => setWeathers(res))
      .catch((error) =>
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${name.common}&appid=${api}`
          )
          .then((res) => setWeathers([res]))
          .catch((err) => console.log(err))
      );

    // get borders countries names
    if (borders) {
      const newBorderList = countries.filter((country) => {
        return borders.indexOf(country.cca3) !== -1;
      });

      setBorderCountries(newBorderList);
    }
  }, [location, borders, capital, countries, name.common]);

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
                    <>
                      <Button
                        key={i}
                        onClick={() =>
                          navigate(`/countries/${newBorderName}`, {
                            state: {
                              country: borderCountry,
                              countries: location.state.countries,
                            },
                          })
                        }
                      >
                        {borderCountry.name.common}
                      </Button>
                    </>
                  );
                })
              : "No borders"}
          </ul>
        </div>
        {/* ----------------WEATHER ------------------ */}
        <h2>Weather</h2>
        {weathers.map((weather, i) => (
          <div key={i}>
            <h3>
              {weather.data.name === name.common ? "Country" : "Capital"} :{" "}
              {weather.data.name}
            </h3>
            <div>
              {weather.data.weather.map((obj, index) => (
                <li key={index}>
                  {obj.main}
                  {obj.description}
                  <img
                    src={`https://openweathermap.org/img/wn/${obj.icon}@2x.png`}
                  />
                </li>
              ))}
            </div>
          </div>
        ))}

        <Button onClick={() => navigate("/")}>Back to countries</Button>
      </div>
    </div>
  );
};

export default SingleCountry;
