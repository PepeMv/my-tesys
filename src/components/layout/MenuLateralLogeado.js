import React, { Fragment, useState } from "react";
import AvatarPersonalizado from "./AvatarPersonalizado";
import {
  Divider,
  makeStyles
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import MenuUsuario from "./MenuUsuario";
import MenuCliente from "./MenuCliente";


const useStyles = makeStyles(theme => ({
  itemMenu: {
    paddingLeft: 15
  },
}));

function MenuLateralLogeado() {
  const classes = useStyles();
  const [tipousuario, setTipoUsuario] = useState('usuario');
  return (
    <Fragment >
      <div >
      <AvatarPersonalizado nombreAvatar="Pp" size="large" />
      </div>
      <div>
        <Alert icon={false} severity="success" className={classes.itemMenu}>
          <Typography variant="h6"> Hola, Pp </Typography>
        </Alert>
        <Divider />        
      </div>
      {
        tipousuario === 'usuario'?
        ( <MenuUsuario /> )
        :
        ( <MenuCliente /> )
      }
    </Fragment>
  );
}

export default MenuLateralLogeado;
