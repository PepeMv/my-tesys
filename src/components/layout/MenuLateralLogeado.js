import React, { Fragment } from "react";
import AvatarPersonalizado from "./AvatarPersonalizado";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import ContactsTwoToneIcon from "@material-ui/icons/ContactsTwoTone";
import { Alert } from "@material-ui/lab";
import uuid from "react-uuid";
import Typography from "@material-ui/core/Typography";
import RestaurantTwoToneIcon from '@material-ui/icons/RestaurantTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import ReceiptTwoToneIcon from '@material-ui/icons/ReceiptTwoTone';

const useStyles = makeStyles(theme => ({
  itemMenu: {
    paddingLeft: 30
  }
}));

function MenuLateralLogeado() {
  const classes = useStyles();
  return (
    <Fragment>
      <AvatarPersonalizado nombreAvatar="Pp" size="large" />
      <div>
        <Alert icon={false} severity="success" className={classes.itemMenu}>
          <Typography variant="h6"> Pp </Typography>
        </Alert>
        <Divider />
        <List>
          <ListItem button key={uuid()}>
            <ListItemIcon>
              <ContactsTwoToneIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">Mi Perfil</Typography>}
            />
          </ListItem>
          <Divider />
          <ListItem button key={uuid()}>
            <ListItemIcon>
              <RestaurantTwoToneIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">Mis Pedidos</Typography>}
            />
          </ListItem>
          <Divider />
          <ListItem button key={uuid()}>
            <ListItemIcon>
              <ReceiptTwoToneIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">Mis Datos de Facturacion</Typography>}
            />
          </ListItem>
          <Divider />
          <ListItem button key={uuid()}>
            <ListItemIcon>
              <ExitToAppTwoToneIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">Cerrar Sesión</Typography>}
            />
          </ListItem>
        </List>
      </div>
    </Fragment>
  );
}

export default MenuLateralLogeado;
