import React, { Fragment } from "react";
import { Alert } from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AvatarPersonalizado from "./AvatarPersonalizado";
import { Divider } from "@material-ui/core";

function MenuLateralNoLogeado({ handleOpenRegistrar, handleOpenLogin }) {
  return (
    <Fragment>
      <AvatarPersonalizado size="large" />
      <Alert severity="warning">
        <Typography variant="h6">No has iniciado sesion!</Typography>
        Inicia sesion o crea una nueva cuenta!
      </Alert>
      <Divider />
      <Button color="primary" variant="outlined" style={{ margin: 10 }} onClick={()=>handleOpenLogin()} >
        <Typography variant="h6">Iniciar Sesión</Typography>
      </Button>
      <Button color="secondary" variant="outlined" style={{ margin: 10 }} onClick={()=>handleOpenRegistrar()} >
        <Typography variant="h6">Registrarse</Typography>
      </Button>
    </Fragment>
  );
}

export default MenuLateralNoLogeado;
