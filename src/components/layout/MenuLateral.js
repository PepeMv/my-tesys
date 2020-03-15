import React,{useState} from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseTwoTone from "@material-ui/icons/CloseTwoTone";
import MenuLateralLogeado from "./MenuLateralLogeado";
import MenuLateralNoLogeado from "./MenuLateralNoLogeado";


const useStyles = makeStyles(theme => ({
  drawerHeader: {    
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 2),
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
    boxShadow: 3
  },
  drawerPaper: {
    width: "auto",
    [theme.breakpoints.up('sm')]: {
      width: 250,
    },
  }, 
}));

function MenuLateral({ abrirmenu, handleCerrarMenu }) {
  const classes = useStyles();

  const [logedo, setLogeado]=useState(true);

  const toggleDrawer = () => event => {
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
    <div >
      <SwipeableDrawer open={abrirmenu ? abrirmenu : false } onClose={toggleDrawer()} onOpen={toggleDrawer()} classes={{
              paper: classes.drawerPaper,
            }}>      
        <div className={classes.drawerHeader}>        
          <div>
            Logo
          </div>
          <IconButton                     
            onClick={() => handleCerrarMenu()}>
            <CloseTwoTone />
          </IconButton>          
        </div>
        <Divider />
        {logedo  ? <MenuLateralLogeado />  : <MenuLateralNoLogeado />}
      </SwipeableDrawer>
    </div>
  );
}

export default MenuLateral;
