import React from "react";
import classes from "./modules/Homepage.module.css";

const HomePage = () => {
  return (
    <div className={`${classes.container}`}>
      <h3>Welcome to REST Countries App. </h3>
      <h3> This is a simple React-Redux application made in Helsinki Business College which uses Rest Countries API and OpenWeatherMap.org</h3>
    </div>
  );
};

export default HomePage;
