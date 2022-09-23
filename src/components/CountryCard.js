import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Fab,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addFavorites, removeFavorite } from "../features/favorites/cartSlice";
import { Link } from "react-router-dom";
import { getLocal, setLocal } from "../services/local";

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
  const { languages, name, currencies, flags, population } = country;

  const urlName = name.common.replaceAll(" ", "-");
  const favorites = useSelector((state) => state.favorites.fav);
  const dispatch = useDispatch();

  const handleFavorites = (favorite) => {
    if (getLocal()) {
      dispatch(addFavorites(favorite));
    } else {
      setLocal([favorite]);
    }
  };

  const handleDelete = (favorite) => {
    dispatch(removeFavorite(favorite));
  };

  const isFav = () => {
    return favorites.find(
      (favorite) => favorite.name.common === name.common
    ) !== undefined
      ? true
      : false;
  };

  return (
    <Card sx={{ maxWidth: 345}}>
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

      {!isFav() ? (
        <Fab
          aria-label="like"
          onClick={() => {
            handleFavorites(country);
          }}
        >
          <FavoriteIcon />
        </Fab>
      ) : (
        <Button onClick={() => handleDelete(country)}>Delete</Button>
      )}
    </Card>
  );
};

export default CountryCard;
