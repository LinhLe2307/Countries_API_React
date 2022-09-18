import { createSlice } from "@reduxjs/toolkit";
import { setLocal, getLocal } from "../../services/local";

export const cartSlice = createSlice({
  name: "favorites",
  initialState: {
    fav: [],
  },
  reducers: {
    addFavorites: (state, action) => {
      const visitedCountry = { ...action.payload, isChecked: true };
      if (
        getLocal().find(
          (country) =>
            country.name.common.indexOf(visitedCountry.name.common) !== -1
        ) === undefined
      ) {
        state.fav.push(visitedCountry);

        getLocal()
          ? setLocal(getLocal().concat(visitedCountry))
          : setLocal(state.fav);
      }
    },

    removeFavorite: (state, action) => {
      const removeCountry = action.payload;
      state.fav = state.fav.filter(
        (country) =>
          country.name.common.indexOf(removeCountry.name.common) !== -1
      );

      setLocal(
        getLocal().filter(
          (country) =>
            country.name.common.indexOf(removeCountry.name.common) === -1
        )
      );
    },
  },
});

export const { addFavorites, removeFavorite } = cartSlice.actions;
export default cartSlice.reducer;
