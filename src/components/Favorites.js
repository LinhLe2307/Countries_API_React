import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeFavorites } from "../features/favorites/cartSlice";
import { getLocal } from "../services/local";
import CountryCard from "./CountryCard";

const Favorites = () => {
  const searchInput = useSelector((state) => state.countries.search);
  const favorites = useSelector((state) => state.favorites.fav);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeFavorites());
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {favorites
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
                <CountryCard country={country} />
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

export default Favorites;
