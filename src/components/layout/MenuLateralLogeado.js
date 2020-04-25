import React, { Fragment } from "react";
import AvatarPersonalizado from "./AvatarPersonalizado";
import {
  Divider,
  makeStyles
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import MenuUsuario from "./MenuUsuario";
import MenuCliente from "./MenuCliente";
import { useSelector } from "react-redux";


const useStyles = makeStyles(theme => ({
  itemMenu: {
    paddingLeft: 15
  },
}));

function MenuLateralLogeado({handleCerrarMenu}) {
  const classes = useStyles();
  //const [tipousuario, setTipoUsuario] = useState('usuario');
  const tipousuario = useSelector( (state) => state.logeo.usuarioInfo.tipoUsuario );
  const nombreInicial = useSelector( (state) => state.logeo.usuarioInfo.nombre );
  const apellidoInicial = useSelector( (state) => state.logeo.usuarioInfo.apellido );
  return (
    <Fragment >
      <div >
      <AvatarPersonalizado nombreAvatar={nombreInicial.charAt(0).toUpperCase() + apellidoInicial.charAt(0).toUpperCase()} size="large" />
      </div>
      <div>
        <Alert icon={false} severity="success" className={classes.itemMenu}>
          <Typography variant="h6"> Hola, {nombreInicial} {apellidoInicial} </Typography>
        </Alert>
        <Divider />        
      </div>
      {
        tipousuario === 'usuario'?
        ( <MenuUsuario handleCerrarMenu={handleCerrarMenu}/> )
        :
        ( <MenuCliente handleCerrarMenu={handleCerrarMenu}/> )
      }
    </Fragment>
  );
}

export default MenuLateralLogeado;
