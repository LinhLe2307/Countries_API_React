import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import Card from "@mui/material/Card";
import Container from "@mui/material/Container";

const SingleCountry = () => {
  let location = useLocation();
  const [weathers, setWeathers] = useState([]);
  const [borderCountries, setBorderCountries] = useState([]);
  const countries = useSelector((state) => state.countries.countries);
  const navigate = useNavigate();

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
    <Container
      maxWidth="100vw"
      sx={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1589519160732-57fc498494f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")',
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: 600,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <h1>{name.common}</h1>

        <img
          src={flags.png}
          alt={`${name.common}`}
          style={{ margin: "2rem 0" }}
        />

        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
          {/* ----------------LANGUAGES ------------------ */}
          <Grid item xs={2} sm={4} md={4}>
            <h3 className="center">Languages</h3>
            {languages &&
              Object.values(languages).map((language, i) => (
                <p key={i} className="center">
                  {language}
                </p>
              ))}
            {/* </ul> */}
          </Grid>

          {/* ----------------CURRENCIES ------------------ */}
          <Grid item xs={2} sm={4} md={4}>
            <ul>
              <h3 className="center">Currencies</h3>
              {currencies &&
                Object.values(currencies).map((currency, i) => (
                  <p key={i} className="center">{`${currency.name}`}</p>
                ))}
            </ul>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
            <ul>
              <h3 className="center">Borders</h3>
              {borderCountries.length > 0 ? (
                borderCountries.map((borderCountry, i) => {
                  const newBorderName = borderCountry.name.common.replaceAll(
                    " ",
                    "-"
                  );
                  return (
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
                  );
                })
              ) : (
                <p className="center">No borders</p>
              )}
            </ul>
          </Grid>
        </Grid>
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

        <Button onClick={() => navigate("/countries")}>
          Back to countries
        </Button>
      </Card>
    </Container>
  );
};

export default SingleCountry;
