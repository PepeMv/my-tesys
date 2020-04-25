import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@material-ui/core'
import uuid from "react-uuid";
import RestaurantTwoToneIcon from "@material-ui/icons/RestaurantTwoTone";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import ContactsTwoToneIcon from "@material-ui/icons/ContactsTwoTone";
import StorageTwoToneIcon from '@material-ui/icons/StorageTwoTone';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cerrarSesionAction } from '../../actions/logeoActions';

function MenuCliente({handleCerrarMenu}) {
  const dispatch = useDispatch();
  const history = useHistory();
    return (
        <List>
          <ListItem button key={uuid()} onClick={()=>{history.push('/miPerfil'); handleCerrarMenu();}} >
            <ListItemIcon>
              <ContactsTwoToneIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">Mi Perfil</Typography>}
            />
          </ListItem>
          <Divider />
          <ListItem button key={uuid()} onClick={()=>{history.push('/datosFacturacion'); handleCerrarMenu();}} >
            <ListItemIcon>
              <StorageTwoToneIcon />
            </ListItemIcon >
            <ListItemText
              primary={<Typography variant="h6">Mis Datos de Facturación</Typography>}
            />
          </ListItem>
          <Divider />
          <ListItem button key={uuid()} onClick={()=>{history.push('/misPedidos'); handleCerrarMenu();}} >
            <ListItemIcon>
              <RestaurantTwoToneIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">Mis Pedidos</Typography>}
            />
          </ListItem>
          <Divider />         
          <ListItem button key={uuid()} onClick={()=> {dispatch(cerrarSesionAction()); history.push('/'); handleCerrarMenu();}}>
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
