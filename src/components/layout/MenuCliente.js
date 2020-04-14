import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@material-ui/core'
import uuid from "react-uuid";
import RestaurantTwoToneIcon from "@material-ui/icons/RestaurantTwoTone";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import ContactsTwoToneIcon from "@material-ui/icons/ContactsTwoTone";
import StorageTwoToneIcon from '@material-ui/icons/StorageTwoTone';

function MenuCliente({handleCerrarMenu}) {
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
              <StorageTwoToneIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">Mis Datos de Facturación</Typography>}
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
