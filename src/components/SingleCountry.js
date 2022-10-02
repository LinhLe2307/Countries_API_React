import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addFavorites, removeFavorite } from "../features/favorites/cartSlice";

import {
  Button,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
} from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import FlagIcon from "@mui/icons-material/Flag";

import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CountriesDetails from "./CountriesDetails";
import { detailHeader } from "../reusableFunction";
import { checkIsFav } from "../reusableFunction";

const SingleCountry = () => {
  let location = useLocation();
  const [weathers, setWeathers] = useState([]);
  const [borderCountries, setBorderCountries] = useState([]);
  const countries = useSelector((state) => state.countries.countries);
  const favorites = useSelector((state) => state.favorites.fav);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { languages, name, currencies, flags, capital, borders, population } =
    location.state.country;

  const isFav = () => {
    return favorites &&
      favorites.find((favorite) => favorite.name.common === name.common) !==
        undefined
      ? true
      : false;
  };

  const handleFavorites = (favorite) => {
    dispatch(addFavorites(favorite));
  };

  const handleDelete = (favorite) => {
    dispatch(removeFavorite(favorite));
  };

  const bordersList = (borderCountries) => {
    if (borderCountries.length > 0) {
      return borderCountries.map((borderCountry, i) => {
        const newBorderName = borderCountry.name.common.replaceAll(" ", "-");
        return (
          <ListItem
            disableGutters
            sx={{
              p: "0 0 0 1rem",
            }}
          >
            <ListItemText
              disableTypography="true"
              type="body2"
              onClick={() =>
                navigate(`/countries/${newBorderName}`, {
                  state: {
                    country: borderCountry,
                  },
                })
              }
              sx={{
                fontFamily: "inherit",
                listStyleType: "disc",
                display: "list-item",
                listStylePosition: "inside",
                margin: 0,
              }}
            >
              {borderCountry.name.common}
            </ListItemText>
          </ListItem>
        );
      });
    } else {
      return <p className="center">No borders</p>;
    }
  };

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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "1rem",
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
          borderRadius: "20px",
        }}
      >
        <CardMedia
          component="img"
          image={flags.png}
          alt="Paella dish"
          sx={{ borderRadius: "15px" }}
        />
        <CardContent
          variant="body2"
          color="text.secondary"
          sx={{
            display: "grid",
            gridTemplateColumn: "repeat(3, 1fr)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: '"Raleway", sans-serif',
              marginBottom: "1rem",
              textAlign: "center",
              fontSize: 32,
            }}
          >
            {name.common}
          </Typography>
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }} flexWrap="wrap">
            <CountriesDetails
              languages={languages}
              currencies={currencies}
              population={population}
            />

            {/* ----------- BORDERS -------- */}
            <Grid item xs={2} sm={4} md={4}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  padding: 0,
                }}
              >
                {detailHeader("Border(s)", <FlagIcon />)}
                {bordersList(borderCountries)}
              </List>
            </Grid>

            <Grid item xs={12} sm={4} md={8}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  padding: 0,
                  margin: "0 auto",
                }}
              >
                {detailHeader("Weather", <ThermostatIcon />)}
                {weathers &&
                  weathers.map((weather, i) => (
                    <ListItem
                      key={i}
                      disableGutters
                      sx={{
                        padding: " 0 0 0 1.5rem",
                      }}
                    >
                      <ListItemText
                        disableTypography="true"
                        type="body2"
                        style={{
                          fontFamily: '"Raleway", sans-serif',
                          listStyleType: "disc",
                          display: "list-item",
                          listStylePosition: "inside",
                          marginTop: 0,
                          marginBottom: 0,
                        }}
                      >
                        {weather.data.name === name.common
                          ? "Country"
                          : "Capital"}{" "}
                        : {weather.data.name}
                      </ListItemText>
                      {weather.data.weather.map((obj, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={obj.main}
                            primaryTypographyProps={{
                              fontSize: 15,
                              fontWeight: "medium",

                              // mb: "2px",
                              fontFamily: '"Raleway", sans-serif',
                              textAlign: "right",
                            }}
                          />

                          <CardMedia
                            component="img"
                            image={`https://openweathermap.org/img/wn/${obj.icon}@2x.png`}
                            sx={{
                              width: "6rem",
                            }}
                          />
                        </ListItem>
                      ))}
                    </ListItem>
                  ))}
              </List>
            </Grid>
          </Grid>
        </CardContent>
        {checkIsFav(
          isFav,
          handleFavorites,
          handleDelete,
          location.state.country
        )}

        <Button
          onClick={() => navigate("/countries")}
          sx={{ fontFamily: "inherit" }}
          variant="contained"
        >
          Back to countries
        </Button>
      </Card>
    </Container>
  );
};

export default SingleCountry;
