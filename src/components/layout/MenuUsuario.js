import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@material-ui/core'
import uuid from "react-uuid";

import PlayCircleOutlineTwoToneIcon from '@material-ui/icons/PlayCircleOutlineTwoTone';
import FindInPageTwoToneIcon from '@material-ui/icons/FindInPageTwoTone';
import BallotTwoToneIcon from '@material-ui/icons/BallotTwoTone';
import FastfoodTwoToneIcon from '@material-ui/icons/FastfoodTwoTone';
import HowToVoteTwoToneIcon from '@material-ui/icons/HowToVoteTwoTone';
import SupervisorAccountTwoToneIcon from '@material-ui/icons/SupervisorAccountTwoTone';
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import AssignmentTwoToneIcon from '@material-ui/icons/AssignmentTwoTone';
import StoreMallDirectoryTwoToneIcon from '@material-ui/icons/StoreMallDirectoryTwoTone';
import {  useHistory } from 'react-router-dom';

function MenuUsuario({handleCerrarMenu}) {
  const history = useHistory();
    return (
        <List>
          <ListItem button key={uuid()} onClick={()=>(history.push('/restaurante'), handleCerrarMenu())} >
            <ListItemIcon>
              <StoreMallDirectoryTwoToneIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6"> Restaurante </Typography>}
            />
          </ListItem>
          <Divider />
          <ListItem button key={uuid()}>
            <ListItemIcon>
              <PlayCircleOutlineTwoToneIcon />
            </ListItemIcon>
            <ListItemText
              primary={ <Typography variant="h6">  Pedidos on live </Typography>}
            />
          </ListItem>
          <Divider />
          <ListItem button key={uuid()}>
            <ListItemIcon>
              <FindInPageTwoToneIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">Buscar Pedidos</Typography>}
            />
          </ListItem>
          <Divider />          
          <ListItem button key={uuid()} onClick={()=>(history.push('/categorias'), handleCerrarMenu())}>
            <ListItemIcon>
              <BallotTwoToneIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">Categorias</Typography>}
            />
          </ListItem>
          <Divider />
          <ListItem button key={uuid()}  onClick={()=>(history.push('/productos'), handleCerrarMenu())} >
            <ListItemIcon>
              <FastfoodTwoToneIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="h6">  Productos  </Typography>
              }
            />
          </ListItem>
          <Divider />         
          <ListItem button key={uuid()} onClick={()=>(history.push('/mesas'), handleCerrarMenu())}>
            <ListItemIcon>
              <HowToVoteTwoToneIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">Mesas</Typography>}
            />
          </ListItem>
          <Divider />
          <ListItem button key={uuid()} onClick={()=>(history.push('/usuarios'), handleCerrarMenu())}>
            <ListItemIcon>
              <SupervisorAccountTwoToneIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">Usuarios</Typography>}
            />
          </ListItem>
          <Divider />
          <ListItem button key={uuid()}>
            <ListItemIcon>
              <AssignmentTwoToneIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">Reportes</Typography>}
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

export default MenuUsuario;
