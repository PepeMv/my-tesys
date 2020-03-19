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
import { Link } from 'react-router-dom';

function MenuUsuario() {
    return (
        <List>
          <ListItem button key={uuid()}>
            <ListItemIcon>
              <StoreMallDirectoryTwoToneIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6"> <Link to={'/restaurante'}> Restaurante </Link> </Typography>}
            />
          </ListItem>
          <Divider />
          <ListItem button key={uuid()}>
            <ListItemIcon>
              <PlayCircleOutlineTwoToneIcon />
            </ListItemIcon>
            <ListItemText
              primary={ <Typography variant="h6"> <Link to ={'/'} > Pedidos on live </Link> </Typography>}
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
          <ListItem button key={uuid()}>
            <ListItemIcon>
              <BallotTwoToneIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">Categorias</Typography>}
            />
          </ListItem>
          <Divider />
          <ListItem button key={uuid()}>
            <ListItemIcon>
              <FastfoodTwoToneIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="h6"> <Link to={'/productos'}> Productos </Link> </Typography>
              }
            />
          </ListItem>
          <Divider />         
          <ListItem button key={uuid()}>
            <ListItemIcon>
              <HowToVoteTwoToneIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">Mesas</Typography>}
            />
          </ListItem>
          <Divider />
          <ListItem button key={uuid()}>
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
