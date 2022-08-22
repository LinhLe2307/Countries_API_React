import React from "react";
import Header from "../components/Header";
import MainPage from "../components/MainPage";

const Layout = ({searchInput, handleSearch}) => {
  return (
    <>
      <Header handleSearch={handleSearch} searchInput={searchInput} />
      <MainPage />
    </>
  );
};

export default Layout;
