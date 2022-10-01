import React from "react";
import { Grid, List, ListItem, ListItemText } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import MoneyIcon from "@mui/icons-material/Money";
import PeopleIcon from "@mui/icons-material/People";
import LanguageIcon from "@mui/icons-material/Language";

const numberFormatter = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + " G";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + " M";
  }
  if (num >= 10000) {
    return (num / 10000).toFixed(2) + " K";
  }
};

const CountriesDetails = ({ languages, currencies, population }) => {
  return (
    <>
      <Grid item xs={2} sm={4} md={4}>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            padding: 0,
          }}
        >
          <ListItem sx={{ fontFamily: '"Raleway", sans-serif' }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
              }}
            >
              <LanguageIcon />
            </ListItemIcon>
            Language(s)
          </ListItem>
          {languages &&
            Object.values(languages).map((language, i) => (
              <ListItem
                key={i}
                disableGutters
                sx={{
                  padding: 0,
                  textAlign: "center",
                }}
              >
                <ListItemText
                  primary={language}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: "medium",
                    lineHeight: "20px",
                    mb: "2px",
                    fontFamily: '"Raleway", sans-serif',
                  }}
                />
              </ListItem>
            ))}
        </List>
      </Grid>

      <Grid item xs={2} sm={4} md={4}>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            padding: 0,
          }}
        >
          <ListItem sx={{ fontFamily: '"Raleway", sans-serif' }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
              }}
            >
              <MoneyIcon />
            </ListItemIcon>
            Currencie(s)
          </ListItem>
          {currencies &&
            Object.values(currencies).map((currency, i) => (
              <ListItem
                key={i}
                disableGutters
                sx={{
                  padding: 0,
                  textAlign: "center",
                }}
              >
                <ListItemText
                  primary={currency.name}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: "medium",
                    lineHeight: "20px",
                    mb: "2px",
                    fontFamily: '"Raleway", sans-serif',
                  }}
                />
              </ListItem>
            ))}
        </List>
      </Grid>
      <Grid item xs={2} sm={4} md={4}>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            padding: 0,
          }}
        >
          <ListItem sx={{ fontFamily: '"Raleway", sans-serif' }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                padding: 0,
              }}
            >
              <PeopleIcon />
            </ListItemIcon>
            Population
          </ListItem>
          {numberFormatter(population)}
        </List>
      </Grid>
    </>
  );
};

export default CountriesDetails;
