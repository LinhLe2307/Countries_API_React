import { createSlice } from "@reduxjs/toolkit";
import countryService from "../../services/countries";
// import { getLocal } from "../../services/local";

export const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    isLoading: true,
    search: "",
  },
  reducers: {
    getCountries: (state, action) => {
      // const newList = action.payload.map((country) => {
      //   const selectedCountry = getLocal().find(
      //     (visitedCountry) => visitedCountry.name.common === country.name.common
      //   );
      //   return selectedCountry !== undefined
      //     ? { ...country, isChecked: true }
      //     : { ...country, isChecked: false };
      // });
      // state.countries = newList;
      state.countries = action.payload;
    },

    isLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    search: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const initializeCountries = () => {
  return async (dispatch) => {
    const countries = await countryService.getAll();
    dispatch(getCountries(countries));
    dispatch(isLoading(false));
  };
};

export const { getCountries, isLoading, search } = countriesSlice.actions;
export default countriesSlice.reducer;
