import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Layout from "./pages/Layout";
import HomePage from "./components/HomePage";
import Countries from "./components/Countries";
import SingleCountry from "./components/SingleCountry";

// const theme = createMuiTheme({
//   typography: {
//     fontFamily: ["Chilanka", "cursive"].join(","),
//   },
// });

function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="countries" element={<Countries />} />
            <Route path="countries/:country" element={<SingleCountry />} />
          </Route>
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
