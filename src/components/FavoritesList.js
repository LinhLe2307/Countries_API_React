import React, { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { initializeFavorites } from "../features/favorites/cartSlice";
import ListCards from "./card/ListCards";

const FavoritesList = () => {
  const favorites = useSelector((state) => state.favorites.fav);
  const isLoading = useSelector((state) => state.favorites.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeFavorites());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <ListCards typeName={favorites} />;
};

export default FavoritesList;
