import React, { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { initializeCountries } from "../features/countries/countriesSlice";
import ListCards from "./card/ListCards";

const Countries = () => {
  const countriesList = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <ListCards typeName={countriesList} />;
};

export default Countries;
