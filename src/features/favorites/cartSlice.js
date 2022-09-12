import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "favorites",
  initialState: {
    fav: [],
  },
  reducers: {
    addFavorites: (state, action) => {
      const isChecked = true;
      const visitedCountry = { ...action.payload, isChecked };
      const local = JSON.parse(localStorage.getItem("countries"));
      if (
        state.fav.find(
          (country) =>
            country.name.common.indexOf(visitedCountry.name.common) !== -1
        ) === undefined
      ) {
        state.fav.push(visitedCountry);
        local
          ? localStorage.setItem(
              "countries",
              JSON.stringify(local.concat(visitedCountry))
            )
          : localStorage.setItem("countries", JSON.stringify(state.fav));
      }
    },

    removeFavorite: (state, action) => {
      const removeCountry = action.payload;
      state.fav = state.fav.filter(
        (country) =>
          country.name.common.indexOf(removeCountry.name.common) !== -1
      );
      localStorage.removeItem(removeCountry.name.common);
    },
  },
});

export const { addFavorites, removeFavorite } = cartSlice.actions;
export default cartSlice.reducer;
