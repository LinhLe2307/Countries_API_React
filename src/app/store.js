import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "../features/countries/countriesSlice";

import cartReducer from "../features/favorites/cartSlice";
export default configureStore({
  reducer: {
    countries: countriesReducer,
    favorites: cartReducer
  },
  middleware: 
  (getDefaultMiddleware) => getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }, ['redux-immutable-state-invariant']
  )
});
