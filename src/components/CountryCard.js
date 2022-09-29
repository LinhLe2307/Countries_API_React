import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Fab,
  Grid,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
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

const CountryCard = ({ country }) => {
  const { languages, name, currencies, flags, population } = country;

  const urlName = name.common.replaceAll(" ", "-");
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.fav);

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
    <Card
      sx={{
        width: 450,
        minHeight: 450,
        margin: "0 auto",
        textAlign: "center",
        backgroundColor: "linear-gradient(145deg, #e2e8ec, #ffffff)",
      }}
    >
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
          sx={{ height: "15rem" }}
        />
      </Link>
      <CardContent
        variant="body2"
        color="text.secondary"
        sx={{ display: "grid", gridTemplateColumn: "repeat(3, 1fr)" }}
      >
        <Typography
          variant="h5"
          sx={{ fontFamily: '"Raleway", sans-serif', marginBottom: "1rem" }}
        >
          {name.common}
        </Typography>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }} flexWrap="wrap">
          <Grid item xs={2} sm={4} md={4}>
            <Typography sx={{ fontFamily: '"Raleway", sans-serif' }}>
              Languages(s)
              {languages &&
                Object.values(languages).map((language, i) => (
                  <li key={i}>{language}</li>
                ))}
            </Typography>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
            <Typography sx={{ fontFamily: '"Raleway", sans-serif' }}>
              Currencies(s)
              {currencies &&
                Object.values(currencies).map((currency, i) => (
                  <li key={i}>{`${currency.name}`}</li>
                ))}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Typography sx={{ fontFamily: '"Raleway", sans-serif' }}>
              Population
            </Typography>
            {numberFormatter(population)}
          </Grid>
        </Grid>
      </CardContent>

      {!isFav() ? (
        <Fab
          aria-label="like"
          onClick={() => handleFavorites(country)}
          sx={{ margin: "1rem" }}
        >
          <FavoriteIcon />
        </Fab>
      ) : (
        <Button onClick={() => handleDelete(country)} sx={{ margin: "1rem" }}>
          Delete
        </Button>
      )}
    </Card>
  );
};

export default CountryCard;
