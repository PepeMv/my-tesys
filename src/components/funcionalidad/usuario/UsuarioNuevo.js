import React, { useState } from "react";
import AppFrame from "../../layout/AppFrame";
import { Formulario } from "../../layout/Formulario";
import { Grid, TextField, Typography, makeStyles,  Input, InputAdornment, IconButton, MenuItem, Button } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import uuid from "react-uuid";

const useStyles = makeStyles(theme => ({
   
    resize: {
      fontSize: 12,      
    },
}));

const UsuarioNuevo = () => {
  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    apellido: "",
    cedula: "",
    password: "",
    email: "",
    direccion: "",
    telefono: "",
    tipo: ""
  });

  const {
    id,
    nombre,
    apellido,
    cedula,
    password,
    email,
    direccion,
    telefono,
    tipo
  } = usuario;
  const actualizarUsuario = e => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
    //console.log(producto);
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const classes = useStyles();
const[showPassword, setShowPassword]=useState(false);
  const renderBody = () => (
    <Formulario>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <TextField
            helperText="* "
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={actualizarUsuario}
            label={<Typography variant="h4"> Nombre </Typography>}
            style={{ margin: 3 }}
            placeholder="Ej. Juan Jose"
            fullWidth
            margin="normal"
            InputProps={{
              classes: {
                input: classes.resize
              }
            }}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            helperText="* "
            id="apellido"
            name="apellido"
            value={apellido}
            onChange={actualizarUsuario}
            label={<Typography variant="h4"> Apellido </Typography>}
            style={{ margin: 3 }}
            placeholder="Ej. Mesias"
            fullWidth
            margin="normal"
            InputProps={{
              classes: {
                input: classes.resize
              }
            }}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12} >
        <TextField
            helperText="* "
            id="cedula"
            name="cedula"
            value={cedula}
            onChange={actualizarUsuario}
            label={<Typography variant="h4"> Cedula </Typography>}
            style={{ margin: 3 }}
            placeholder="Ej. 18045....."            
            fullWidth
            type="number"
            margin="normal"
            InputProps={{
              classes: {
                input: classes.resize
              }
            }}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            helperText="* "
            id="email"
            name="email"
            value={email}
            onChange={actualizarUsuario}
            label={<Typography variant="h4"> E-mail </Typography>}
            style={{ margin: 3 }}
            placeholder="Ej. jmesias@gmail.com"
            fullWidth
            margin="normal"
            InputProps={{
              classes: {
                input: classes.resize
              }
            }}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>       
        <Typography htmlFor="password" variant="h5" color='textSecondary' aling='left'>Password</Typography>
          <Input
          fullWidth         
            id="password"
            name="password"
            style={{ margin: 3 }}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={actualizarUsuario}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>(setShowPassword(!showPassword))}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }            
          /> 
        </Grid>
        <Grid item xs={12} >
        <TextField
            helperText="* "
            id="direccion"
            name="direccion"
            value={direccion}
            onChange={actualizarUsuario}
            label={<Typography variant="h4"> Dirección </Typography>}
            style={{ margin: 3 }}
            placeholder="Ej. Patate ..."            
            fullWidth            
            margin="normal"
            InputProps={{
              classes: {
                input: classes.resize
              }
            }}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            helperText="* "
            id="telefono"
            name="telefono"
            value={telefono}
            onChange={actualizarUsuario}
            label={<Typography variant="h4"> Telefono </Typography>}
            style={{ margin: 3 }}
            placeholder="Ej. 0999999999"
            fullWidth            
            margin="normal"
            InputProps={{
              classes: {
                input: classes.resize
              }
            }}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            select
            id="tipo"
            name="tipo"
            value={tipo}
            onChange={actualizarUsuario}
            label={<Typography variant="h4"> Tipo </Typography>}
            style={{ margin: 3 }}
            helperText="* Seleciona.."
            fullWidth
            margin="normal"
            InputProps={{
              classes: {
                input: classes.resize
              }
            }}
            InputLabelProps={{
              shrink: true
            }}
          >
            
            <MenuItem key={uuid()} value="usuario">
              Usuario
            </MenuItem>
            <MenuItem key={uuid()} value="cliente">
              Cliente
            </MenuItem>
            
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary" fullWidth>
            <Typography variant="h5"> Guardar </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="outlined" color="primary" fullWidth>
            <Typography variant="h5"> Cancelar </Typography>
          </Button>
        </Grid>
      </Grid>
    </Formulario>
  );

  return <AppFrame titulo="Nuevo Usuario" body={renderBody()} />;
};

export default UsuarioNuevo;
