import React, { useState } from "react";
import AppFrame from "../../layout/AppFrame";
import { Formulario } from "../../layout/Formulario";
import {
  Grid,
  TextField,
  Typography,
  makeStyles,
  MenuItem,
  Button,
} from "@material-ui/core";
import uuid from "react-uuid";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { insertarDatoFacturacionAction } from "../../../actions/logeoActions";
const useStyles = makeStyles((theme) => ({
  resize: {
    fontSize: 12,
  },
}));

const DatosDeFacturacion = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const usuario = useSelector((state) => state.logeo.usuarioInfo);
  const [datosfacturacion, setDatosFacturacion] = useState({
    id: "",
    nombre: "",
    tipoDocumento: "",
    numeroDocumento: "",
    direccion: "",
    telefono: "",
    idUsuario: usuario.id
  });

  const {
    nombre,
    tipoDocumento,
    numeroDocumento,
    direccion,
    telefono,
    //idUsuario,
  } = datosfacturacion;

  const actualizarUsuario = (e) => {
    setDatosFacturacion({
      ...datosfacturacion,
      [e.target.name]: e.target.value,
    });
    //console.log(producto);
  };

  const [errortipoDocumento, setErrortipoDocumento] = useState({
    error: false,
    texto: "*",
  });

  const [errornumeroDocumento, setErrornumeroDocumento] = useState({
    error: false,
    texto: "*",
  });

  const [errornombre, setErrorNombre] = useState({
    error: false,
    texto: "*",
  });

  const [errortelefono, setErrorTelefono] = useState({
    error: false,
    texto: "*",
  });
  const [errordireccion, setErrorDireccion] = useState({
    error: false,
    texto: "*",
  });

  async function enviarDatoFacturacion() {
    if (tipoDocumento.toString().trim() === "") {
      setErrortipoDocumento({
        error: true,
        texto: "Selecione un tipo de documento!",
      });
    } else if (numeroDocumento.trim() === "" || numeroDocumento.length < 10) {
      setErrornumeroDocumento({
        error: true,
        texto: "Ingrese un numero de docuemnto correcto!",
      });
    } else if (nombre.trim() === "") {
      setErrorNombre({
        error: true,
        texto: "Ingrese su nombre!",
      });
    } else if (telefono.trim() === "" || telefono.length < 8) {
      setErrorTelefono({
        error: true,
        texto: "Ingrese su numero de telefono",
      });
    } else if (direccion.trim() === "") {
      setErrorDireccion({
        error: true,
        texto: "Ingrese su direccion de referencia!",
      });
    } else {
      setErrortipoDocumento({
        error: false,
        texto: "*",
      });
      setErrornumeroDocumento({
        error: false,
        texto: "*",
      });
      setErrorNombre({
        error: false,
        texto: "*",
      });

      setErrorDireccion({
        error: false,
        texto: "*",
      });
      setErrorTelefono({
        error: false,
        texto: "*",
      });
      //distpach
            
      const result = await dispatch(
        insertarDatoFacturacionAction(datosfacturacion)
      );
      //console.log(result);
      if (result === "success") {
        history.goBack();
      }
    }
  }
  const renderBody = () => (
    <Formulario>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            error={errortipoDocumento.error}
            helperText={errortipoDocumento.texto}
            id="tipoDocumento"
            name="tipoDocumento"
            value={tipoDocumento}
            onChange={actualizarUsuario}
            label={<Typography variant="h4"> Tipo de Documento </Typography>}
            style={{ margin: 3 }}
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
            error={errornumeroDocumento.error}
            helperText={errornumeroDocumento.texto}
            id="numeroDocumento"
            name="numeroDocumento"
            value={numeroDocumento}
            onChange={actualizarUsuario}
            label={<Typography variant="h4"> Número de documento </Typography>}
            style={{ margin: 3 }}
            placeholder="Ej. 18045....."
            fullWidth
            type="number"
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
            error={errornombre.error}
            helperText={errornombre.texto}
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
            error={errortelefono.error}
            helperText={errortelefono.texto}
            type="number"
            id="telefono"
            name="telefono"
            value={telefono}
            onChange={actualizarUsuario}
            label={<Typography variant="h4"> Telefono </Typography>}
            style={{ margin: 3 }}
            placeholder="Ej. 0997668541"
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
          <TextField
            error={errordireccion.error}
            helperText={errordireccion.texto}
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
            onClick={() => enviarDatoFacturacion()}
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

  return <AppFrame titulo="Nuevo dato de facturación" body={renderBody()} />;
};

export default DatosDeFacturacion;
