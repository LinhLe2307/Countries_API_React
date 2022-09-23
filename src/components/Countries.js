import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeCountries } from "../features/countries/countriesSlice";
import { initializeFavorites } from "../features/favorites/cartSlice";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";
import CountryCard from "./CountryCard";

const Countries = () => {
  const countriesList = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);
  const favorites = useSelector((state) => state.favorites.fav);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(initializeFavorites());
  }, [dispatch]);

  if (isLoading) {
    <p>Is loading</p>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {countriesList
          .filter((c) =>
            c.name.common.toLowerCase().includes(searchInput.toLowerCase())
          )
          .map((country, i) => {
            return (
              <Grid
                item
                xs={4}
                sm={2}
                md={3}
                key={i}
                justifyContent="center"
                alignItems="center"
              >
                <CountryCard country={country} favorites={favorites} />
              </Grid>
            );
          })}
        <Button
          variant="contained"
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          }
          sx={{
            position: "fixed",
            right: "2rem",
            bottom: "2rem",
            boxShadow:
              "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
          }}
        >
          Up to Top
        </Button>
      </Grid>
    </Box>
  );
};

export default Countries;
