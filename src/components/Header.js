import React from "react";
import { useSelector } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import SearchCountries from "./SearchCountries";
import { Link } from "react-router-dom";

const pages = ["HomePage", "Countries", "Favorites"];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const favorites = useSelector((state) => state.favorites.fav);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const checkHeader = (page) => {
    if (page === "HomePage") {
      return (
        <Link to="/" className="link">
          <Typography
            textAlign="center"
            sx={{
              marginLeft: "1rem",
              fontFamily: '"Raleway", sans-serif',
            }}
          >
            Homepage
          </Typography>
        </Link>
      );
    } else if (page === "Favorites") {
      return (
        <Link to={`${page.toLowerCase()}`} className="link">
          <Typography
            textAlign="center"
            sx={{ marginLeft: "1rem", fontFamily: '"Raleway", sans-serif' }}
          >
            {page} {favorites.length}
          </Typography>
        </Link>
      );
    } else {
      return (
        <Link to={`${page.toLowerCase()}`} className="link">
          <Typography
            textAlign="center"
            sx={{ marginLeft: "1rem", fontFamily: '"Raleway", sans-serif' }}
          >
            {page}
          </Typography>
        </Link>
      );
    }
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disabledgutter="true">
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: '"Raleway", sans-serif',
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Linh Le
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  {checkHeader(page)}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: '"Raleway", sans-serif',
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Linh Le
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <>{checkHeader(page)}</>
            ))}
          </Box>
          <SearchCountries />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
