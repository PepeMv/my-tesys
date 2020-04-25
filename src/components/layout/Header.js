import React, { useState, useEffect } from "react";
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
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import RestaurantSharpIcon from "@material-ui/icons/RestaurantSharp";
import { Skeleton } from "@material-ui/lab";
//
import { useDispatch } from "react-redux";
import { obtenerRestauranteAction } from "../../actions/restauranteActions";
import { obtenerCategoriasAction } from "../../actions/categoriasActions";
import { obtenerProductosAction } from "../../actions/productosActions";
import { obtenerMesasAction } from "../../actions/mesasActions";
import ModalLogin from "../funcionalidad/login/ModalLogin";
import ModalRegistrar from "../funcionalidad/login/ModalRegistrar";
import {
  getUsuarioAutenticado,
  cerrarSesionAction,
} from "../../actions/logeoActions";

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
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    //consultar la api
    const cargarRestaurante = () => dispatch(obtenerRestauranteAction());
    cargarRestaurante();
    const cargarCategorias = () => dispatch(obtenerCategoriasAction());
    cargarCategorias();
    const cargarProductos = () => dispatch(obtenerProductosAction());
    cargarProductos();
    const cargarMesas = () => dispatch(obtenerMesasAction());
    cargarMesas();
    //const p = jwt.decode('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC91c3VhcmlvXC9sb2dpbiIsImlhdCI6MTU4NzU4OTAxMywiZXhwIjoxNTg3NTkyNjEzLCJuYmYiOjE1ODc1ODkwMTMsImp0aSI6Im9YQWFTYnVGUGtseEQ1THEiLCJzdWIiOjEzLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.JJEYqbCwe41fJ5ASMwVbtLj22Rz7czN1do7kqmrwlUM');
    //console.log(p.sub);
    //me trato de logear si ya estoy logeado
    dispatch(getUsuarioAutenticado());
    //eslint-disable-next-line
  }, []);

  //obtener nombre el restaurante
  const nombreRestaurante = useSelector(
    (state) => state.restaurante.restauranteInfo.nombre
  );
  //obtener logo  el restaurante
  const logoRestaurante = useSelector(
    (state) => state.restaurante.imagenes.logo
  );
  const nombreInicial = useSelector((state) => state.logeo.usuarioInfo);
  //const apellidoInicial = useSelector( (state) => state.logeo.usuarioInfo.apellido );

  const logedo = useSelector((state) => state.logeo.autenticado);
  const numeroItemsPedido = useSelector((state) => state.pedidos.numeroItems);

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegistrar, setOpenRegistrar] = useState(false);
  const [abrirmenu, setAbrirMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  //const [logedo, setLogeado] = useState(true);

  const classes = useStyles();

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleOpenRegistrar = () => {
    setOpenRegistrar(true);
  };

  const handleCloseRegistrar = () => {
    setOpenRegistrar(false);
  };

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
      <MenuItem
        onClick={() => {dispatch(cerrarSesionAction()); handleMenuClose(); history.push('/');}}
      >
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
          ) : (
            <Skeleton
              variant="circle"
              aniimation="weave"
              width={40}
              height={40}
            />
          )}
          <Typography variant="h5" className={classes.title}>
            <Link to={"/"}>
              {nombreRestaurante ? (
                nombreRestaurante
              ) : (
                <Skeleton
                  variant="text"
                  aniimation="weave"
                  width={100}
                  height={40}
                />
              )}
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
              <AvatarPersonalizado
                nombreAvatar={
                  nombreInicial
                    ? nombreInicial.nombre.charAt(0).toUpperCase()
                    : "U"
                }
                size="small"
              />
            </IconButton>
          ) : (
            <Hidden xsDown>
              <Button
                color="primary"
                variant="contained"
                onClick={() => handleOpenRegistrar()}
              >
                <Typography variant="h6">Registrarse</Typography>
              </Button>
              <Button
                color="inherit"
                variant="outlined"
                style={{ marginLeft: 5 }}
              >
                <Typography variant="h6" onClick={() => handleOpenLogin()}>
                  Iniciar Sesión
                </Typography>
              </Button>
            </Hidden>
          )}
          <Box>
            <Badge
              badgeContent={numeroItemsPedido}
              {...defaultProps}
              showZero
            />
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenuPerfil}
      <MenuLateral
        abrirmenu={abrirmenu}
        handleCerrarMenu={handleCerrarMenu}
        logedo={logedo}
        handleOpenLogin={handleOpenLogin}
        handleOpenRegistrar={handleOpenRegistrar}
      />
      <ModalLogin openLogin={openLogin} handleCloseLogin={handleCloseLogin} />
      <ModalRegistrar
        openRegistrar={openRegistrar}
        handelCloseRegistrar={handleCloseRegistrar}
      />
    </div>
  );
}

export default Header;
