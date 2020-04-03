import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
import MenuLateral from "./MenuLateral";
import AvatarPersonalizado from "./AvatarPersonalizado";
import { Menu, MenuItem } from "@material-ui/core";
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  
}));

function Header() {
  const [abrirmenu, setAbrirMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [logedo, setLogeado] = useState(true);

  const classes = useStyles();

  const handleAbrirMenu = () => {
    setAbrirMenu(true);
  };

  const handleCerrarMenu = () => {
    setAbrirMenu(false);
  };

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenuPerfil = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        {" "}
        <Typography variant="h6">Mi Perfil</Typography>{" "}
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        {" "}
        <Typography variant="h6">Cerrar Sesión</Typography>{" "}
      </MenuItem>
    </Menu>
  );

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
            <Link to={'/'} >
            RE - TomaOs
            </Link>            
          </Typography>         

          {logedo === true ? (
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AvatarPersonalizado nombreAvatar="Pp" size="small" />
            </IconButton>
          ) : (
            <Hidden xsDown>
              <Button color="primary" variant="contained">
                <Typography variant="h6">Registrarse</Typography>
              </Button>
              <Button
                color="inherit"
                variant="outlined"
                style={{ marginLeft: 5 }}
              >
                <Typography variant="h6">Iniciar Sesión</Typography>
              </Button>
            </Hidden>
          )}
        </Toolbar>
      </AppBar>
      {renderMenuPerfil}
      <MenuLateral abrirmenu={abrirmenu} handleCerrarMenu={handleCerrarMenu} />
    </div>
  );
}

export default Header;
