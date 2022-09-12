import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "favorites",
  initialState: {
    fav: [],
  },
  reducers: {
    getFavorites: (state, action) => {
      const visitedCountry = action.payload;
    //   if (
    //     state.fav.find(
    //       (country) =>
    //         country.name.common.indexOf(visitedCountry.name.common) !== -1
    //     )
    //   ) {
    //     state.fav.push(visitedCountry);
    // }
    state.fav.push(visitedCountry);
    },
  },
});
export const { getFavorites } = cartSlice.actions;
export default cartSlice.reducer;
