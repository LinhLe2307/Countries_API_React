import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./pages/Layout";
import HomePage from "./components/HomePage";
import Countries from "./components/Countries";
import DetailsCountry from "./components/DetailsCountry";
import FavoritesList from "./components/FavoritesList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="countries" element={<Countries />} />
          <Route path="countries/:country" element={<DetailsCountry />} />
          <Route path="favorites" element={<FavoritesList />} />
          <Route path="favorites/:country" element={<DetailsCountry />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
