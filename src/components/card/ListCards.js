import React from "react";
import { useSelector } from "react-redux";

import { Box, Fab } from "@mui/material";
import Grid from "@mui/material/Grid";
import NavigationIcon from "@mui/icons-material/Navigation";
import SingleCard from "./SingleCard";

const ListCards = ({ typeName }) => {
  const searchInput = useSelector((state) => state.countries.search);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        justifyContent="center"
        alignItems="stretch"
        spacing="0.5rem"
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ gridAutoRows: "1fr" }}
      >
        {typeName
          .filter((c) =>
            c.name.common.toLowerCase().includes(searchInput.toLowerCase())
          )
          .map((country, i) => {
            return (
              <Grid item key={i}>
                <SingleCard country={country} />
              </Grid>
            );
          })}
        <Fab
          color="primary"
          aria-label="up"
          id="backToTop"
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            })
          }
          sx={{
            position: "fixed",
            right: "1rem",
            bottom: "1rem",
            boxShadow:
              "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
          }}
        >
          <NavigationIcon />
        </Fab>
      </Grid>
    </Box>
  );
};

export default ListCards;
