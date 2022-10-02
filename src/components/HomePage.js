import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const HomePage = () => {
  return (
    <div className="container">
      <Box
        sx={{
          backdropFilter: "blur(10px)",
          margin: "auto 0",
        }}
      >
        <Typography variant="h4" sx={{ fontFamily: '"Raleway", sans-serif"' }}>
          Welcome to REST Countries App.{" "}
        </Typography>
        <Typography variant="p" sx={{ fontFamily: '"Raleway", sans-serif"' }}>
          {" "}
          This is a simple React-Redux application made in Helsinki Business
          College which uses Rest Countries API and OpenWeatherMap.org
        </Typography>
      </Box>
    </div>
  );
};

export default HomePage;
