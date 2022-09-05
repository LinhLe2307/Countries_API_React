import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Layout from "./pages/Layout";
import HomePage from "./components/HomePage";
import Countries from "./components/Countries";
import SingleCountry from "./components/SingleCountry";
import { useSelector } from "react-redux";


function App() {
  const [searchInput, setSearchInput] = useState("");
  // const countries = useSelector(state => state.countries.countries)

  // const handleSearch = (e) => {
  //   const newCountriesList = countries.filter(
  //     (country) =>
  //       country.name.common
  //         .toLowerCase()
  //         .indexOf(e.target.value.toLowerCase()) !== -1
  //   );
    
  // };


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout/>
          }
        >
          <Route index element={<HomePage />} />
          <Route
            path="countries"
            element={
              <Countries/>
            }
          />
          <Route path="countries/:country" element={<SingleCountry />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
