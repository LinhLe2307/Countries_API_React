import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Fab,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { addFavorites, removeFavorite } from "../features/favorites/cartSlice";

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

const CountryCard = ({ country, favorites }) => {
  const { languages, name, currencies, flags, population } = country;

  const urlName = name.common.replaceAll(" ", "-");
  const dispatch = useDispatch();

  const handleFavorites = (favorite) => {
    dispatch(addFavorites(favorite));
  };

  const handleDelete = (favorite) => {
    dispatch(removeFavorite(favorite));
  };

  const isFav = () => {
    return favorites &&
      favorites.find((favorite) => favorite.name.common === name.common) !==
        undefined
      ? true
      : false;
  };

  return (
    <Card sx={{ maxWidth: 345, height: 500 }}>
      <Link
        to={`${urlName}`}
        state={{
          country: country,

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
        <Fab aria-label="like" onClick={() => handleFavorites(country)}>
          <FavoriteIcon />
        </Fab>
      ) : (
        <Button onClick={() => handleDelete(country)}>Delete</Button>
      )}
    </Card>
  );
};

export default CountryCard;
