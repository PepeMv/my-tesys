import React, { Fragment, useState } from "react";
import {
  Formulario  
} from "./../../layout/Formulario";
import AppFrame from "../../layout/AppFrame";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import uuid from "react-uuid";
import { Grid, Typography, MenuItem, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  resize: {
    fontSize: 12
  }
}));

function ProductoNuevo() {
  const actualizarProducto = e => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
    console.log(producto);
  };

  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
    aplica_iva: "",
    id_categoria: ""
  });
  const {
    nombre,
    descripcion,
    precio,
    imagen,
    aplica_iva,
    id_categoria
  } = producto;

  const handleSubmit = () => {};
  const classes = useStyles();
  const currencies = [
    {
      value: "USD",
      label: "$"
    },
    {
      value: "EUR",
      label: "€"
    },
    {
      value: "BTC",
      label: "฿"
    },
    {
      value: "JPY",
      label: "¥"
    }
  ];
  const renderBody = () => (
    <Formulario>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
          helperText="* "
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={actualizarProducto}
            label={<Typography variant="h4"> Nombre </Typography>}
            style={{ margin: 10 }}
            placeholder="Ej. Hamburguesa con queso.."
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
            id="precio"
            name="precio"
            value={precio}
            onChange={actualizarProducto}
            label={<Typography variant="h4"> Precio </Typography>}
            style={{ margin: 10 }}
            type="number"
            placeholder="Ej. 2,50"
            fullWidth
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
        {/* //segunda fila  */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            id="id_categoria"
            name="id_categoria"
            value={id_categoria}
            onChange={actualizarProducto}
            label={<Typography variant="h4"> Categoria </Typography>}
            style={{ margin: 10 }}
            helperText="* Seleciona una categoria"
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
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField            
            select
            id="aplica_iva"
            name="aplica_iva"
            value={aplica_iva}
            onChange={actualizarProducto}
            label={<Typography variant="h4"> Aplica Iva </Typography>}
            style={{ margin: 10 }}
            helperText="* Elije si al producto se aplica IVA."
            fullWidth
            defaultValue={0}
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
            <MenuItem key={uuid()} value="0">
              No
            </MenuItem>
            <MenuItem key={uuid()} value="1">
              Si
            </MenuItem>
          </TextField>
        </Grid>
        {/* tercera fila  */}
        <Grid item xs={12} sm={6}>
          <TextField
            id="imagen"
            name="imagen"
            value={imagen}
            onChange={actualizarProducto}
            label={<Typography variant="h4"> Elige una imagen </Typography>}
            style={{ margin: 10 }}
            type="file"
            accept="image/*"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="descripcion"
            name="descripcion"
            value={descripcion}
            onChange={actualizarProducto}
            label={<Typography variant="h4"> Descripción </Typography>}
            style={{ margin: 10 }}
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        {/* botones  */}
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

  return <AppFrame titulo="Nuevo Producto" body={renderBody()} />;
}

export default ProductoNuevo;
