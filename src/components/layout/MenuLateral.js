import React, { useState } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseTwoTone from "@material-ui/icons/CloseTwoTone";
import MenuLateralLogeado from "./MenuLateralLogeado";
import MenuLateralNoLogeado from "./MenuLateralNoLogeado";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 2),
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
    boxShadow: 3,
  },
  drawerPaper: {
    width: "auto",
    position: "relative",
    [theme.breakpoints.up("sm")]: {
      width: 250,
    },
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

function MenuLateral({ abrirmenu, handleCerrarMenu }) {
  //obtener logo  el restaurante
  const logoRestaurante = useSelector(
    (state) => state.restaurante.imagenes.logo
  );
  const classes = useStyles();

  const [logedo, setLogeado] = useState(true);

  const toggleDrawer = () => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    handleCerrarMenu();
  };

  return (
    <div>
      <SwipeableDrawer
        open={abrirmenu ? abrirmenu : false}
        onClose={toggleDrawer()}
        onOpen={toggleDrawer()}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <div>
            {logoRestaurante ? (
              <Avatar
                alt="Logo del restaurante"
                src={logoRestaurante}
                className={classes.large}
              />
            ) : (
              <Avatar className={classes.large}>Logo</Avatar>
            )}
          </div>
          <IconButton onClick={() => handleCerrarMenu()}>
            <CloseTwoTone />
          </IconButton>
        </div>
        <Divider />
        {logedo ? <MenuLateralLogeado handleCerrarMenu={handleCerrarMenu}/> : <MenuLateralNoLogeado />}
      </SwipeableDrawer>
    </div>
  );
}

export default MenuLateral;
