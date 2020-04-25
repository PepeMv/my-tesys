import React, { useState } from "react";
import { Formulario } from "./../../layout/Formulario";
import AppFrame from "../../layout/AppFrame";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import uuid from "react-uuid";
import {
  Grid,
  Typography,
  MenuItem,
  Button,
  Icon,
  Avatar,
  Paper,
} from "@material-ui/core";
import BotonSelectFile from "../FileUploader/BotonSelectFile";
import { alerta } from "./../../layout/AlertaCRUD";
//reux actions
import { insertarProductoAction } from "./../../../actions/productosActions";
import { useHistory } from "react-router-dom";
import Spinner from "../../layout/Spinner";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  resize: {
    fontSize: 12,
  },
  paper: {
    alignContent: "center",
    maxWidth: 400,
    margin: `auto`,
    padding: theme.spacing(0.2),
    backgroundColor: "#cfe8fc",
  },
}));

function ProductoNuevo() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const loading = useSelector((state) => state.productos.loading);
  const cate = useSelector((state) => state.categorias.listadoCategorias);

  const actualizarProducto = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
    aplica_iva: 1,
    id_categoria: "",
  });

  const [imgurl, setImgUrl] = useState("");

  const { nombre, descripcion, precio, imagen, id_categoria } = producto;

  const actualizarProductoImgs = (e) => {
    if (e.target.files[0]) {
      setProducto({
        ...producto,
        [e.target.name]: e.target.files[0],
      });
      setImgUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const [errornombre, setErrorNombre] = useState({
    error: false,
    texto: "*",
  });

  const [errorprecio, setErrorPrecio] = useState({
    error: false,
    texto: "*",
  });

  const [errorcategoria, setErrorCategoria] = useState({
    error: false,
    texto: "*",
  });

  const [errordescripcion, setErrorDescripcion] = useState({
    error: false,
    texto: "*",
  });

  async function submitInsertarProducto  () {
    if (nombre.trim() === "") {
      setErrorNombre({
        error: true,
        texto: "El nombre es requerido",
      });
    } else if (precio.toString().trim() === "") {
      setErrorPrecio({
        error: true,
        texto: "El precio es requerido",
      });
    } else if (id_categoria.toString().trim() === "") {
      setErrorCategoria({
        error: true,
        texto: "La categoria es requerida",
      });
    } else if (imagen === "") {
      alerta("Es obligatoria una imagen", "error");
    } else if (descripcion.trim() === "") {
      setErrorDescripcion({
        error: true,
        texto: "Debe ingresar una descripción",
      });
    } else {
      setErrorNombre({
        error: false,
        texto: "*",
      });
      setErrorPrecio({
        error: false,
        texto: "*",
      });
      setErrorCategoria({
        error: false,
        texto: "*",
      });
      setErrorDescripcion({
        error: false,
        texto: "*",
      });
      //distpach
      const resultado = await dispatch(insertarProductoAction(producto));
      if(resultado==="success"){
        history.goBack();
      }
    }    
  };

  const renderBody = () => (
    <Formulario>
      <Spinner active={loading} />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            helperText={errornombre.texto}
            error={errornombre.error}
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
                input: classes.resize,
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            helperText={errorprecio.texto}
            error={errorprecio.error}
            id="precio"
            name="precio"
            value={precio}
            onChange={actualizarProducto}
            label={<Typography variant="h4"> Precio </Typography>}
            style={{ margin: 10 }}
            type="number"
            placeholder="Ej. 2.50"
            fullWidth
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
        {/* //segunda fila  */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            helperText={errorcategoria.texto}
            error={errorcategoria.error}
            id="id_categoria"
            name="id_categoria"
            value={id_categoria}
            onChange={actualizarProducto}
            label={<Typography variant="h4"> Categoria </Typography>}
            style={{ margin: 10 }}
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
          >
            {cate.map((option) => (
              <MenuItem key={uuid()} value={option.id}>
                {option.nombre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {/* tercera fila  */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} className={classes.paper}>
            <Typography variant="h5" align="left">
              Imagen
            </Typography>
            <Grid
              container
              wrap="nowrap"
              spacing={1}
              alignItems="center"
              justify="space-evenly"
            >
              <Grid item>
                {imgurl ? <Avatar src={imgurl} /> : <Avatar>SF</Avatar>}
              </Grid>
              <Grid item>
                <BotonSelectFile
                  id="imagen"
                  name="imagen"
                  value={imagen}
                  multiple={false}
                  onChange={actualizarProductoImgs}
                  button={
                    <Button variant="outlined" color="default">
                      Subir Imagen
                      <Icon style={{ marginLeft: 7 }}>cloud_upload</Icon>
                    </Button>
                  }
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TextField
            helperText={errordescripcion.texto}
            error={errordescripcion.error}
            id="descripcion"
            name="descripcion"
            value={descripcion}
            onChange={actualizarProducto}
            label={<Typography variant="h4"> Descripción </Typography>}
            style={{ margin: 10 }}
            fullWidth
            multiline
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        {/* botones  */}
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => submitInsertarProducto()}
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

  return <AppFrame titulo="Nuevo Producto" body={renderBody()} />;
}

export default ProductoNuevo;
