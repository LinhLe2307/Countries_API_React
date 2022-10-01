import React from "react";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CountryCard from "./CountryCard";

const CardsList = ({ typeName }) => {
  const searchInput = useSelector((state) => state.countries.search);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        justifyContent="center"
        // alignItems="center"
        alignItems="stretch"
        spacing="0.5rem"
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {typeName
          .filter((c) =>
            c.name.common.toLowerCase().includes(searchInput.toLowerCase())
          )
          .map((country, i) => {
            return (
              <Grid item key={i}>
                <CountryCard country={country} />
              </Grid>
            );
          })}
        <Button
          variant="contained"
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          }
          sx={{
            position: "fixed",
            right: "2rem",
            bottom: "2rem",
            boxShadow:
              "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
          }}
        >
          Up to Top
        </Button>
      </Grid>
    </Box>
  );
};

export default CardsList;
