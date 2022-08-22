import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Layout from "./pages/Layout";
import HomePage from "./components/HomePage";
import Countries from "./components/Countries";
import SingleCountry from "./components/SingleCountry";
import { getAll } from "./fetchAPI";

// const theme = createMuiTheme({
//   typography: {
//     fontFamily: ["Chilanka", "cursive"].join(","),
//   },
// });

function App() {
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    const newCountriesList = countries.filter(
      (country) =>
        country.name.common
          .toLowerCase()
          .indexOf(e.target.value.toLowerCase()) !== -1
    );
    setSearchInput(e.target.value);
    setFilterCountries(newCountriesList);
  };

  useEffect(() => {
    setIsLoading((prev) => !prev);
    getAll("https://restcountries.com/v3.1/all")
      .then((intialNotes) => {
        setFilterCountries(intialNotes);
        setCountries(intialNotes);
        setIsLoading((prev) => !prev);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout handleSearch={handleSearch} searchInput={searchInput} />
          }
        >
          <Route index element={<HomePage />} />
          <Route
            path="countries"
            element={
              <Countries
                filterCountries={filterCountries}
                countries={countries}
                isLoading={isLoading}
              />
            }
          />
          <Route path="countries/:country" element={<SingleCountry />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
