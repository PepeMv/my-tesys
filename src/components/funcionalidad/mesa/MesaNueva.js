import React, { useState } from "react";
import AppFrame from "../../layout/AppFrame";
import { Formulario } from "../../layout/Formulario";
import { Grid, TextField, Typography, makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  
    resize: {
      fontSize: 12
    },
}));

const MesaNueva = () => {
    const classes = useStyles();
    const[mesa, setMesa] = useState({
        id:'',
        nombre:'',
        descripcion:''
    });

    const actualizarMesa = e => {
        setMesa({
          ...mesa,
          [e.target.name]: e.target.value
        });    
      };
    const {nombre, descripcion, id} = mesa;
  const renderBody = () => (
    <Formulario>
      <Grid container spacing={3}>
        <Grid item xs={12} >
        <TextField
            helperText="*"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={actualizarMesa}
            label={<Typography variant="h4"> Nombre </Typography>}
            style={{ width: "70%" }}
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
            helperText="*"
            id="descripcion"
            name="descripcion"
            value={descripcion}
            onChange={actualizarMesa}
            label={<Typography variant="h4"> Descripción </Typography>}
            style={{ width: "70%" }}
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
          <Button variant="outlined" color="primary" fullWidth>
            <Typography variant="h5"> Cancelar </Typography>
          </Button>
        </Grid>
      </Grid>
    </Formulario>
  );

  return <AppFrame titulo="Nueva Mesa" body={renderBody()} />;
};

export default MesaNueva;
