import React, { Fragment, useState } from "react";
import Modal from "./../../layout/Modal";
import {
  Grid,
  TextField,
  Typography,
  makeStyles,
  Input,
  InputAdornment,
  IconButton,
  Button,
  Box,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { logearUsuario } from "../../../actions/logeoActions";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  resize: {
    fontSize: 12,
  },
}));

const ModalLogin = ({ openLogin, handleCloseLogin }) => {
  const error = useSelector((state) => state.logeo.mensaje);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });
  const { email, password } = credenciales;
  const actualizarCredenciales = (e) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
    //console.log(producto);
  };
  const [erroremail, setErrorEmail] = useState({
    error: false,
    texto: "*",
  });
  const [errorpassword, setErrorPassword] = useState({
    error: false,
    texto: "*",
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function enviarLoginUsuario() {
    if (email.trim() === "") {
      setErrorEmail({
        error: true,
        texto: "Ingrese su email!",
      });
    } else if (password.trim() === "" ) {
      //alerta("La contraseña debe ser minimo de 6 caracteres", "error");
      setErrorPassword({
        error: true,
        texto: "Ingrese una contraseña",
      });
    } else {
      setErrorEmail({
        error: false,
        texto: "*",
      });
      setErrorPassword({
        error: false,
        texto: "*",
      });

      const result = await dispatch(logearUsuario(credenciales));
      //console.log(result);
      if (result === "success") {
        setCredenciales({
          email: "",
          password: "",
        });
        handleCloseLogin();
      }
    }
  }

  const renderLogin = () => (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            error={erroremail.error}
            helperText={erroremail.texto}
            id="email"
            name="email"
            value={email}
            onChange={actualizarCredenciales}
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
        <Grid item xs={12}>
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
            onChange={actualizarCredenciales}
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
        {error !== null ? (
          <Box m={1} width="100%">
            <Alert severity="error" >
              <Typography variant="h6"> Credenciales invalidas</Typography>
            </Alert>
          </Box>
        ) : null}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => enviarLoginUsuario()}
          >
            <Typography variant="h5"> Iniciar Sesion </Typography>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => handleCloseLogin()}
          >
            <Typography variant="h5"> Cancelar </Typography>
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
  return (
    <Modal
      open={openLogin}
      handleClose={handleCloseLogin}
      titulo="Inicia Sesión"
      contenido={renderLogin()}
    />
  );
};

export default ModalLogin;
