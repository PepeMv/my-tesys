import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuLateral from "./MenuLateral";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(5)
  },
  title: {
    flexGrow: 1
  }
}));

function Header() {
  const [abrirmenu, setAbrirMenu] = useState(false);
  const classes = useStyles();
  const handleAbrirMenu = () => {
    setAbrirMenu(true);
  };

  const handleCerrarMenu = () => {
    setAbrirMenu(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => handleAbrirMenu()}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            <Box fontWeight="fontWeightBold" m={1} fontSize={16}>
              Re - TomaOs
            </Box>
          </Typography>
          <Button variant="outlined" color="inherit">
            <Typography variant="h5">Registrarse</Typography>
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            className={classes.menuButton}
          >
            <Typography variant="h5">Iniciar sesión</Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <MenuLateral abrirmenu={abrirmenu} handleCerrarMenu={handleCerrarMenu} />
    </div>
  );
}

export default Header;
