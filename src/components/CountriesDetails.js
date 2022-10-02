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
  const detailsList = [{ Languages: languages }, { Currencies: currencies }];

  return (
    <>
      {/* ---------LANGUAGES---------- */}
      <Grid item xs={2} sm={4} md={4}>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            padding: 0,
          }}
        >
          <ListItem sx={{ fontFamily: '"Raleway", sans-serif', fontSize: 18 }}>
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
                  p: "0 0 0 1rem",
                }}
              >
                <ListItemText
                  disableTypography="true"
                  type="body2"
                  style={{
                    fontFamily: '"Raleway", sans-serif',
                    listStyleType: "disc",
                    display: "list-item",
                    listStylePosition: "inside",
                    marginTop: 0,
                    marginBottom: "1rem",
                  }}
                >
                  {language}
                </ListItemText>
              </ListItem>
            ))}
        </List>
      </Grid>

      {/* ---------CURRENCIES---------- */}
      <Grid item xs={2} sm={4} md={4}>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            padding: 0,
          }}
        >
          <ListItem sx={{ fontFamily: '"Raleway", sans-serif', fontSize: 18 }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
              }}
            >
              <MoneyIcon />
            </ListItemIcon>
            Currencies
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
                  disableTypography="true"
                  type="body2"
                  style={{
                    fontFamily: '"Raleway", sans-serif',
                    listStyleType: "disc",
                    display: "list-item",
                    listStylePosition: "inside",
                    marginTop: 0,
                    marginBottom: "1rem",
                  }}
                >
                  {currency.name}
                </ListItemText>
              </ListItem>
            ))}
        </List>
      </Grid>

      {/* ---------POPULATION---------- */}
      <Grid item xs={2} sm={4} md={4}>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            padding: 0,
          }}
        >
          <ListItem sx={{ fontFamily: '"Raleway", sans-serif', fontSize: 18 }}>
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
          <ListItem
            disableGutters
            sx={{
              padding: 0,
              textAlign: "center",
            }}
          >
            <ListItemText
              primary={numberFormatter(population)}
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
                fontFamily: '"Raleway", sans-serif',
                marginBottom: "1rem",
              }}
            />
          </ListItem>
        </List>
      </Grid>
    </>
  );
};

export default CountriesDetails;
