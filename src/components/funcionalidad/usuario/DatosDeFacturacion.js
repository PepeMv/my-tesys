import React, {useState} from "react";
import AppFrame from "../../layout/AppFrame";
import { Formulario } from "../../layout/Formulario";
import { Grid, TextField, Typography, makeStyles, MenuItem, Button } from "@material-ui/core";
import uuid from "react-uuid";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles(theme => ({
   
    resize: {
      fontSize: 12,      
    },
}));

const DatosDeFacturacion = () => {

    const [datosfacturacion, setDatosFacturacion] = useState({
        id: "",
        nombre: "",
        apellido: "",
        tipo_ducumento:'',
        cedula: "",        
        email: "",
        direccion: "",
        id_cliente   :''             
      });
    
      const {
        id,
        nombre,
        apellido,
        tipo_ducumento,
        cedula,        
        email,
        direccion,
        id_cliente
        
      } = datosfacturacion;

      const actualizarUsuario = e => {
        setDatosFacturacion({
          ...datosfacturacion,
          [e.target.name]: e.target.value
        });
        //console.log(producto);
      };

      const history = useHistory();
  const classes = useStyles();
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
        <Grid item xs={12} sm={6}>
          <TextField
            select
            helperText="* Seleciona "
            id="tipo_ducumento"
            name="tipo_ducumento"
            value={tipo_ducumento}
            onChange={actualizarUsuario}
            label={<Typography variant="h4"> Tipo de Documento </Typography>}
            style={{ margin: 3 }}            
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
            <MenuItem key={uuid()} value="cedula">
              Cedula
            </MenuItem>
            <MenuItem key={uuid()} value="ruc">
              R.U.C
            </MenuItem>
            <MenuItem key={uuid()} value="pasaporte">
              Pasaporte
            </MenuItem>
            </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            helperText="* "
            id="cedula"
            name="cedula"
            value={cedula}
            onChange={actualizarUsuario}
            label={<Typography variant="h4">  Número de documento </Typography>}
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
          <Button variant="contained" color="primary" fullWidth>
            <Typography variant="h5"> Guardar </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="outlined" color="primary" fullWidth onClick={()=> history.goBack() } >
            <Typography variant="h5"> Cancelar </Typography>
          </Button>
        </Grid>
      </Grid>
    </Formulario>
      );

  return <AppFrame titulo="Nuevos datos de facturación" body={renderBody()} />;
};

export default DatosDeFacturacion;
