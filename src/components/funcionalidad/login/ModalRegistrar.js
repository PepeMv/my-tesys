import React, { Fragment, useState } from "react";
import Modal from "./../../layout/Modal";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  Grid,
  TextField,
  Typography,
  MenuItem,
  makeStyles,
  Input,
  IconButton,
  InputAdornment,
  Button,
  Box,
} from "@material-ui/core";
import uuid from "react-uuid";
//import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registrarUsuarioAction } from "../../../actions/usuarioActions";
import { alerta } from "../../layout/AlertaCRUD";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  resize: {
    fontSize: 12,
  },
}));

const ModalRegistrar = ({ openRegistrar, handelCloseRegistrar }) => {
  const dispatch = useDispatch();
  //const history = useHistory();
  const error = useSelector((state) => state.usuario.error);
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    apellido: "",
    tipoDocumento: "",
    numeroDocumento: "",
    email: "",
    password: "",
    telefono: "",
    direccion: "",
    tipoUsuario: "cliente",
  });

  const {
    //id,
    nombre,
    apellido,
    tipoDocumento,
    numeroDocumento,
    email,
    password,
    telefono,
    direccion,
  } = usuario;
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

  const [errorapellido, setErrorApellido] = useState({
    error: false,
    texto: "*",
  });
  const [erroremail, setErrorEmail] = useState({
    error: false,
    texto: "*",
  });

  const [errorpassword, setErrorPassword] = useState({
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
  const actualizarUsuario = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
    //console.log(producto);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function enviarRegistrarUsuario() {
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
    } else if (apellido.trim() === "") {
      setErrorApellido({
        error: true,
        texto: "Ingrese su apellido",
      });
    } else if (email.trim() === "") {
      setErrorEmail({
        error: true,
        texto: "Ingrese su email!",
      });
    } else if (password.trim() === "" || password.length < 6) {
      alerta("La contraseña debe ser minimo de 6 caracteres", "error");
      setErrorPassword({
        error: true,
        texto: "Ingrese una contraseña",
      });
    } else if (direccion.trim() === "") {
      setErrorDireccion({
        error: true,
        texto: "Ingrese su direccion de referencia!",
      });
    } else if (telefono.trim() === "" || telefono.length < 8) {
      setErrorTelefono({
        error: true,
        texto: "Ingrese su numero de telefono",
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
      setErrorApellido({
        error: false,
        texto: "*",
      });
      setErrorEmail({
        error: false,
        texto: "*",
      });
      setErrorPassword({
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
      const result = await dispatch(registrarUsuarioAction(usuario));
      //console.log(result);
      if (result === "success") {
        setUsuario({
          id: "",
          nombre: "",
          apellido: "",
          tipoDocumento: "",
          numeroDocumento: "",
          email: "",
          password: "",
          telefono: "",
          direccion: "",
          tipoUsuario: "cliente",
        });
        handelCloseRegistrar();
      }
    }
  }

  const renderLogin = () => (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
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
            error={errorapellido.error}
            helperText={errorapellido.texto}
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
            error={erroremail.error}
            helperText={erroremail.texto}
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
                input: classes.resize,
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            htmlFor="password"
            variant="h5"
            color="textSecondary"
            aling="ri"
          >
            Password
          </Typography>
          <Input
            error={errorpassword.error}
            //helperText={errorpassword.texto}
            fullWidth
            id="password"
            name="password"
            style={{ margin: 3 }}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={actualizarUsuario}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
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
        <Grid item xs={12}>
          <TextField
            error={errortelefono.error}
            helperText={errortelefono.texto}
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
                input: classes.resize,
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        {error !== null && error !== false ? (
          <Box m={1}>
            <Alert severity="error">
              <Typography variant="h6">{error}</Typography>
            </Alert>
          </Box>
        ) : null}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => enviarRegistrarUsuario()}
          >
            <Typography variant="h5"> Crear cuenta </Typography>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => handelCloseRegistrar()}
          >
            <Typography variant="h5"> Cancelar </Typography>
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
  return (
    <Modal
      open={openRegistrar}
      handleClose={handelCloseRegistrar}
      titulo="Obtener una cuenta"
      contenido={renderLogin()}
    />
  );
};

export default ModalRegistrar;
