import React, { useState } from "react";
import AppFrame from "../../layout/AppFrame";
import { Formulario } from "../../layout/Formulario";
import { useHistory } from "react-router-dom";
import {
  Grid,
  makeStyles,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
//redux
import { insertarCategoriaAction } from "./../../../actions/categoriasActions";
import Spinner from "../../layout/Spinner";
const useStyles = makeStyles((theme) => ({
  grid: {
    width: "auto",
  },
}));

const NuevaCategoria = () => {
  const loading = useSelector((state) => state.categorias.loading);
  const history = useHistory();
  const distpach = useDispatch();
  const classes = useStyles();
  const [categoria, setCategoria] = useState({
    id: "",
    nombre: "",
  });

  const { nombre } = categoria;
  const [errornombre, setErrorNombre] = useState({
    error: false,
    texto: "*",
  });

  const actualizarCategoria = (e) => {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  };

  async function enviarCategoriaInsert () {
    if (nombre.trim() === "") {
      setErrorNombre({
        error: true,
        texto: "El nombre es obligatorio!",
      });
    } else {
      setErrorNombre({
        error: false,
        texto: "*",
      });
      const respuesta = await distpach(insertarCategoriaAction(categoria));
      if(respuesta==="success"){
        history.goBack();
      }
    }
  };

  const renderBody = () => (
    <Formulario>
      <Spinner active={loading} />
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12}>
          <TextField
            helperText={errornombre.texto}
            error={errornombre.error}
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
                input: classes.resize,
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => enviarCategoriaInsert()}
          >
            <Typography variant="h5"> Guardar </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => history.goBack()}
          >
            <Typography variant="h5"> Cancelar </Typography>
          </Button>
        </Grid>
      </Grid>
    </Formulario>
  );

  return <AppFrame titulo="Nueva Categoria" body={renderBody()} />;
};

export default NuevaCategoria;
