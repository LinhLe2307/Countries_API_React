import { createSlice } from "@reduxjs/toolkit";
import { setLocal, getLocal } from "../../services/local";

export const cartSlice = createSlice({
  name: "favorites",
  initialState: {
    fav: []
  },
  reducers: {
    getFavorites: (state, action) => {
      state.fav = action.payload;
    },

    addFavorites: (state, action) => {
      if (
        state.fav.find(
          (country) =>
            country.name.common.indexOf(action.payload.name.common) !== -1
        ) === undefined
      ) {
        state.fav.push(action.payload);
        setLocal(state.fav);
      }
    },

    removeFavorite: (state, action) => {
      const removeCountry = action.payload;
      state.fav = state.fav.filter(
        (country) =>
          country.name.common.indexOf(removeCountry.name.common) === -1
      );

      setLocal(state.fav);
    },
  },
});

export const initializeFavorites = () => {
  return async (dispatch) => {
    const localFavList = await getLocal();
    if (localFavList) {
      dispatch(getFavorites(localFavList));
    } else {
      dispatch(getFavorites([]));
    }
  };
};

export const { getFavorites, addFavorites, removeFavorite } = cartSlice.actions;
export default cartSlice.reducer;
