import { Button, Fab, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const detailHeader = (header, icon) => {
  return (
    <ListItem sx={{ fontFamily: '"Raleway", sans-serif', fontSize: 18 }}>
      <ListItemIcon
        sx={{
          minWidth: 0,
        }}
      >
        {icon}
      </ListItemIcon>
      {header}
    </ListItem>
  );
};

export const checkIsFav = (isFav, handleFavorites, handleDelete, country) => {
  return !isFav() ? (
    <Fab
      aria-label="like"
      onClick={() => handleFavorites(country)}
      sx={{ margin: "1rem" }}
    >
      <FavoriteIcon />
    </Fab>
  ) : (
    <Button onClick={() => handleDelete(country)} sx={{ margin: "1rem" }}>
      Delete
    </Button>
  );
};

