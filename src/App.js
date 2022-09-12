import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./pages/Layout";
import HomePage from "./components/HomePage";
import Countries from "./components/Countries";
import Favorites from "./components/Favorites";
import SingleCountry from "./components/SingleCountry";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="countries" element={<Countries />} />
          <Route path="countries/:country" element={<SingleCountry />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="favorites/:country" element={<SingleCountry />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
