import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFavorites, removeFavorite } from "../features/favorites/cartSlice";
import { Link } from "react-router-dom";

const numberFormatter = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + " G";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + " M";
  }
  if (num >= 10000) {
    return (num / 10000).toFixed(2) + " K";
  }
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const CountryCard = ({ country, countries }) => {
  const { languages, name, currencies, flags, capital, population } = country;
  const urlName = name.common.replaceAll(" ", "-");
  const dispatch = useDispatch();

  const handleFavorites = (favorite) => {
    console.log(favorite);
    dispatch(addFavorites(favorite));
  };

  const handleDelete = (favorite) => {
    dispatch(removeFavorite(favorite));
  };

  return (
    <Card sx={{ maxWidth: 345, position: "relative" }}>
      <Link
        to={`${urlName}`}
        state={{
          country: country,
          countries: countries,
        }}
      >
        <CardMedia
          component="img"
          height="194"
          // image="https://images.unsplash.com/photo-1661147338478-03c1893fd330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          image={`${flags.png}`}
          alt={`${name.common}`}
        />
      </Link>
      <CardContent
        variant="body2"
        color="text.secondary"
        sx={{ display: "grid", gridTemplateColumn: "repeat(3, 1fr)" }}
      >
        <Typography variant="h4">{name.common}</Typography>

        <Typography>
          LANGUAGES
          {languages &&
            Object.values(languages).map((language, i) => (
              <li key={i}>{language}</li>
            ))}
        </Typography>

        <Typography>
          CURRENCIES
          {currencies &&
            Object.values(currencies).map((currency, i) => (
              <li key={i}>{`${currency.name}`}</li>
            ))}
        </Typography>
        <Typography>
          POPULATION
          {numberFormatter(population)}
        </Typography>
      </CardContent>
      <Checkbox {...label} onChange={() => handleFavorites(country)} />
      <Button onClick={() => handleDelete(country)}>Delete</Button>
    </Card>
  );
};

export default CountryCard;
