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
import CountriesDetails from "./CountriesDetails";

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
        borderRadius: "20px",
        maxWidth: 450,
        margin: "0.5rem",
        textAlign: "center",
        background: "linear-gradient(145deg, #e2e8ec, #ffffff)",
        boxShadow: "5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff",
      }}
    >
      <CardContent className="card-container">
        <Link
          to={`${urlName}`}
          state={{
            country: country,
          }}
        >
          <CardMedia
            component="img"
            height="194"
            image={flags.png}
            alt={name.common}
            sx={{
              height: "15rem",
              objectFit: "cover",
              verticalAlign: "middle",
              backgroundSize: "cover",
              transition: "all 1.2s",
              borderRadius: "15px",
            }}
            className="card-image"
          />
        </Link>
      </CardContent>
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
          <CountriesDetails
            languages={languages}
            currencies={currencies}
            population={population}
          />
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
