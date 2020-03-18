import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@material-ui/core'
import uuid from "react-uuid";
import RestaurantTwoToneIcon from "@material-ui/icons/RestaurantTwoTone";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import ReceiptTwoToneIcon from "@material-ui/icons/ReceiptTwoTone";
import ContactsTwoToneIcon from "@material-ui/icons/ContactsTwoTone";


function MenuCliente() {
    return (
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
              primary={
                <Typography variant="h6">Mis Datos de Facturacion</Typography>
              }
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
          <Divider />
        </List>
    )
}

export default MenuCliente
