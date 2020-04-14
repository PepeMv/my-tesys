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
import { Menu, MenuItem, Avatar, Box, Badge } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import RestaurantSharpIcon from "@material-ui/icons/RestaurantSharp";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0.5),
  },
  title: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

function Header() {
  //obtener nombre el restaurante
  const nombreRestaurante = useSelector(
    (state) => state.restaurante.restauranteInfo.nombre
  );
  //obtener logo  el restaurante
  const logoRestaurante = useSelector(
    (state) => state.restaurante.imagenes.logo
  );

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

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const defaultProps = {
    color: "secondary",
    children: <RestaurantSharpIcon fontSize="large" />,
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
        <Typography variant="h6">Mi Perfil</Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Typography variant="h6">Cerrar Sesión</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
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
          {logoRestaurante ? (
            <Box m={1}>
              <Avatar
                alt="Logo del restaurante"
                src={logoRestaurante}
                className={classes.large}
              />
            </Box>
          ) :  ( <Skeleton variant="circle" aniimation='weave' width={40} height={40} />)}
          <Typography variant="h5" className={classes.title}>
            <Link to={"/"}>
              {nombreRestaurante ? nombreRestaurante : ( <Skeleton variant="text" aniimation='weave' width={100} height={40} />)}
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
          <Box>
            <Badge badgeContent={0} {...defaultProps} showZero />
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenuPerfil}
      <MenuLateral abrirmenu={abrirmenu} handleCerrarMenu={handleCerrarMenu} />
    </div>
  );
}

export default Header;
