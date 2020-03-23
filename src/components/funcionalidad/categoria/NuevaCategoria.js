import React, { useState } from "react";
import AppFrame from "../../layout/AppFrame";
import { Formulario } from "../../layout/Formulario";
import { Grid, makeStyles, TextField, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    
    grid: {
      width: "auto"
    },
   
  }));

const NuevaCategoria = () => {
    const classes = useStyles();
  const [categoria, setCategoria] = useState({
    id: "",
    nombre: ""
  });

  const {id, nombre} = categoria;

  const actualizarCategoria = e => {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value
    });
  };

  const renderBody = () => (
    <Formulario>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12}>
        <TextField
            helperText="*"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={actualizarCategoria}
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

  return <AppFrame titulo="Nueva Categoria" body={renderBody()} />;
};

export default NuevaCategoria;
