import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "../features/countries/countriesSlice";
import cartReducer from "../features/favorites/cartSlice";
export default configureStore({
  reducer: {
    countries: countriesReducer,
    favorites: cartReducer
  },
});
