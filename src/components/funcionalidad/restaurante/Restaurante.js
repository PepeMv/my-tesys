import React, { useState, useEffect } from "react";
import AppFrame from "../../layout/AppFrame";
import { useDispatch, useSelector } from "react-redux";
import { Formulario } from "../../layout/Formulario";
import { editarRestauranteAction } from "./../../../actions/restauranteActions";
import { useHistory } from "react-router-dom";
import {
  Grid,
  TextField,
  Typography,
  Avatar,
  Paper,
  MenuItem,
  Button,
  Icon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import uuid from "react-uuid";
import BotonSelectFile from "../FileUploader/BotonSelectFile";
import Spinner from "./../../layout/Spinner";

const useStyles = makeStyles((theme) => ({
  resize: {
    fontSize: 12,
  },
  grid: {
    width: "auto",
  },
  paper: {
    alignContent: "center",
    maxWidth: 400,
    margin: `auto`,
    padding: theme.spacing(2),
    backgroundColor: "#cfe8fc",
  },
}));

function Restaurante() {
  const dispatch = useDispatch();

  //jalo datos del restaurante del estate
  const restauranteState = useSelector((state) => state.restaurante);
  const loading = useSelector((state) => state.restaurante.loading);

  //state para enviar al request
  const [restaurante, setRestaurante] = useState({
    id: "",
    nombre: "",
    logo: "",
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    iva: "",
    estado: "",
    costoEnvio: "",
  });

  //states para mostrar la imagen temporal subida
  const [urllogo, setUrlLogo] = useState("");
  const [urlimg1, setUrlImg1] = useState("");
  const [urlimg2, setUrlImg2] = useState("");
  const [urlimg3, setUrlImg3] = useState("");
  const [urlimg4, setUrlImg4] = useState("");

  useEffect(() => {
    setRestaurante(restauranteState.restauranteInfo);
    setUrlLogo(restauranteState.imagenes.logo);
    setUrlImg1(restauranteState.imagenes.img1);
    setUrlImg2(restauranteState.imagenes.img2);
    setUrlImg3(restauranteState.imagenes.img3);
    setUrlImg4(restauranteState.imagenes.img4);
  }, [restauranteState]);

  const {
    nombre,
    logo,
    img1,
    img2,
    img3,
    img4,
    iva,
    estado,
    costoEnvio,
  } = restaurante;
  const actualizarRestaurante = (e) => {
    setRestaurante({
      ...restaurante,
      [e.target.name]: e.target.value,
    });
  };

  const actualizarRestauranteImgs = (e) => {
    if (e.target.files[0]) {
      setRestaurante({
        ...restaurante,
        [e.target.name]: e.target.files[0],
      });
      //console.log((e.target.files[0]));
      //console.log(e.target.files[0]);
      if (e.target.name === "logo") {
        setUrlLogo(URL.createObjectURL(e.target.files[0]));
      } else if (e.target.name === "img1") {
        setUrlImg1(URL.createObjectURL(e.target.files[0]));
      } else if (e.target.name === "img2") {
        setUrlImg2(URL.createObjectURL(e.target.files[0]));
      } else if (e.target.name === "img3") {
        setUrlImg3(URL.createObjectURL(e.target.files[0]));
      } else if (e.target.name === "img4") {
        setUrlImg4(URL.createObjectURL(e.target.files[0]));
      }
    }

    /* console.log(producto); */
  };

  //mostrar errores de inputs
  const [errornombre, setErrorNombre] = useState({
    error: false,
    texto: "*",
  });
  const [erroriva, setErrorIva] = useState({
    error: false,
    texto: "*",
  });
  const [errorCostoEnvio, setErrorCostoEnvio] = useState({
    error: false,
    texto: "*",
  });
  const submitEdiatrRestaurante = () => {
    if (nombre.trim() === "") {
      setErrorNombre({
        error: true,
        texto: "El nombre es obligatorio",
      });
    } else if (iva.toString().trim() === "") {
      setErrorIva({
        error: true,
        texto: "El iva es obligatorio",
      });
    } else if (costoEnvio.toString().trim() === "") {
      setErrorCostoEnvio({
        error: true,
        texto: "El costo es obligatorio",
      });
    } else {
      setErrorNombre({
        error: false,
        texto: "*",
      });
      setErrorIva({
        error: false,
        texto: "*",
      });
      setErrorCostoEnvio({
        error: false,
        texto: "*",
      });
      dispatch(editarRestauranteAction(restaurante));
    }
  };

  const history = useHistory();
  const classes = useStyles();
  const renderBody = () => (
    <div>
      <Spinner active={loading} />
      <Formulario>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={12}>
            <TextField
              helperText={errornombre.texto}
              error={errornombre.error}
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={actualizarRestaurante}
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
          <Grid item xs={12}>
            <Paper elevation={2} className={classes.paper}>
              <Typography variant="h5" align="left">
                {" "}
                Logo{" "}
              </Typography>
              <Grid
                container
                wrap="nowrap"
                spacing={1}
                alignItems="center"
                justify="space-evenly"
              >
                <Grid item>
                  {urllogo ? <Avatar src={urllogo} /> : <Avatar>SF</Avatar>}
                </Grid>
                <Grid item>
                  <BotonSelectFile
                    id="logo"
                    name="logo"
                    value={logo}
                    multiple={false}
                    onChange={actualizarRestauranteImgs}
                    button={
                      <Button variant="contained" color="primary">
                        Cambiar
                        <Icon style={{ marginLeft: 7 }}>cloud_upload</Icon>
                      </Button>
                    }
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={2} className={classes.paper}>
              <Typography variant="h5" align="left">
                {" "}
                Imagen 1{" "}
              </Typography>
              <Grid
                container
                wrap="nowrap"
                spacing={1}
                alignItems="center"
                justify="space-evenly"
              >
                <Grid item>
                  {urlimg1 ? <Avatar src={urlimg1} /> : <Avatar>SF</Avatar>}
                </Grid>
                <Grid item>
                  <BotonSelectFile
                    id="img1"
                    name="img1"
                    value={img1}
                    multiple={false}
                    onChange={actualizarRestauranteImgs}
                    button={
                      <Button variant="contained" color="primary">
                        Cambiar
                        <Icon style={{ marginLeft: 7 }}>cloud_upload</Icon>
                      </Button>
                    }
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={2} className={classes.paper}>
              <Typography variant="h5" align="left">
                {" "}
                Imagen 2{" "}
              </Typography>
              <Grid
                container
                wrap="nowrap"
                spacing={1}
                alignItems="center"
                justify="space-evenly"
              >
                <Grid item>
                  {urlimg2 ? <Avatar src={urlimg2} /> : <Avatar>SF</Avatar>}
                </Grid>
                <Grid item>
                  <BotonSelectFile
                    id="img2"
                    name="img2"
                    value={img2}
                    multiple={false}
                    onChange={actualizarRestauranteImgs}
                    button={
                      <Button variant="contained" color="primary">
                        Cambiar
                        <Icon style={{ marginLeft: 7 }}>cloud_upload</Icon>
                      </Button>
                    }
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={2} className={classes.paper}>
              <Typography variant="h5" align="left">
                {" "}
                Imagen 3{" "}
              </Typography>
              <Grid
                container
                wrap="nowrap"
                spacing={1}
                alignItems="center"
                justify="space-evenly"
              >
                <Grid item>
                  {urlimg3 ? <Avatar src={urlimg3} /> : <Avatar>SF</Avatar>}
                </Grid>
                <Grid item>
                  <BotonSelectFile
                    id="img3"
                    name="img3"
                    value={img3}
                    multiple={false}
                    onChange={actualizarRestauranteImgs}
                    button={
                      <Button variant="contained" color="primary">
                        Cambiar
                        <Icon style={{ marginLeft: 7 }}>cloud_upload</Icon>
                      </Button>
                    }
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={2} className={classes.paper}>
              <Typography variant="h5" align="left">
                Imagen 4
              </Typography>
              <Grid
                container
                wrap="nowrap"
                spacing={1}
                alignItems="center"
                justify="space-evenly"
              >
                <Grid item>
                  {urlimg4 ? <Avatar src={urlimg4} /> : <Avatar>SF</Avatar>}
                </Grid>
                <Grid item>
                  <BotonSelectFile
                    id="img4"
                    name="img4"
                    value={img4}
                    multiple={false}
                    onChange={actualizarRestauranteImgs}
                    button={
                      <Button variant="contained" color="primary">
                        Cambiar
                        <Icon style={{ marginLeft: 7 }}>cloud_upload</Icon>
                      </Button>
                    }
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {/* columna final */}
          <Grid item xs={12} sm={4}>
            <TextField
              helperText={erroriva.texto}
              error={erroriva.error}
              id="iva"
              name="iva"
              value={iva}
              onChange={actualizarRestaurante}
              label={<Typography variant="h4"> IVA Actual </Typography>}
              style={{ margin: 10 }}
              type="number"
              placeholder="Ej. 12"
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
          <Grid item xs={12} sm={4}>
            <TextField
              helperText={errorCostoEnvio.texto}
              error={errorCostoEnvio.error}
              id="costoEnvio"
              name="costoEnvio"
              value={costoEnvio}
              onChange={actualizarRestaurante}
              label={<Typography variant="h4"> Costo de Envio </Typography>}
              style={{ margin: 10 }}
              type="number"
              placeholder="Ej. 2.50"
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
          <Grid item xs={12} sm={4}>
            <TextField
              select
              id="estado"
              name="estado"
              value={estado}
              onChange={actualizarRestaurante}
              label={<Typography variant="h4"> Ordenes </Typography>}
              style={{ margin: 10 }}
              helperText="* Permitir realizar ordenes"
              defaultValue={0}
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
              <MenuItem key={uuid()} value={0}>
                No
              </MenuItem>
              <MenuItem key={uuid()} value={1}>
                Si
              </MenuItem>
            </TextField>
          </Grid>
          {/* botones */}
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => submitEdiatrRestaurante(restaurante)}
            >
              <Typography variant="h5"> Guardar </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => history.push("/")}
            >
              <Typography variant="h5"> Cancelar </Typography>
            </Button>
          </Grid>
        </Grid>
      </Formulario>
    </div>
  );

  return <AppFrame titulo="Restaurante" body={renderBody()} />;
}

export default Restaurante;
