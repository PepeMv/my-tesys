import React from "react";
import AppFrame from "../../layout/AppFrame";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Button,
  Typography,
  Divider,
  makeStyles,
  Paper,
  Box,
  IconButton
} from "@material-ui/core";
import uuid from "react-uuid";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import { Formulario } from "../../layout/Formulario";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  contenedorTituloSubtotal: {
    /* textAlign:'right' */
    textAlign: "left"
  }
}));

const DatosFacturacionContainer = () => {
  const classes = useStyles();
  const columns = [
    { title: "id", field: "id" },
    { title: "nombre", field: "nombre" },
    { title: "apellido", field: "apellido" },
    {
      title: "tipo_ducumento",
      field: "tipo_ducumento",
      lookup: { cedula: "Cedula", ruc: "R.U.C", pasaporte: "Pasaporte" }
    },
    { title: "cedula", field: "cedula", type: "numeric" },
    { title: "email", field: "email" },
    { title: "direccion", field: "direccion" },
    { title: "id_cliente", field: "id_cliente" }
  ];
  const data = [
    {
      id: 1,
      nombre: "Juan Jose",
      apellido: "Mesias",
      tipo_ducumento: "cedula",
      cedula: "1804569364",
      email: "pepemv1997@gmail.com",
      direccion: "patate"
    },
    {
      id: 1,
      nombre: "Juan Jose",
      apellido: "Mesias",
      tipo_ducumento: "cedula",
      cedula: "1804569364",
      email: "pepemv1997@gmail.com",
      direccion: "patate"
    },
    {
      id: 1,
      nombre: "Juan Jose",
      apellido: "Mesias",
      tipo_ducumento: "cedula",
      cedula: "1804569364",
      email: "pepemv1997@gmail.com",
      direccion: "patate"
    }
  ];
  const history = useHistory();
  const renderBody = () => (
    <Formulario>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => history.push("/datosFacturacion/nuevo")}
          >
            <Typography variant="h5"> Agreagr nuevos datos </Typography>
          </Button>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          {data.length !== 0 ? (
            data.map(item => (
              <div key={uuid()}>
                <Paper className={classes.paper}  variant="outlined">
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={10}
                      className={classes.contenedorTituloSubtotal}
                    >
                      <Box fontWeight="fontWeightBold" m={1}>
                        <Typography variant="h4">
                          {item.nombre} {item.apellido}{" "}
                        </Typography>
                      </Box>
                      <Box fontWeight="" ml={1}>
                        <Typography variant="h5">{item.cedula}</Typography>
                      </Box>
                      <Box fontWeight="" ml={1}>
                        <Typography variant="h5">{item.direccion}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton>
                        <Edit fontSize="large" color="secondary" />
                      </IconButton>
                      <IconButton>
                        <DeleteOutline fontSize="large" color="inherit" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
                <Divider />
              </div>
            ))
          ) : (
            <Box m={2}>
              <Alert severity="warning">
                <Typography variant="h6">
                  No existen datos de facturacion!
                </Typography>
              </Alert>
            </Box>
          )}
        </Grid>
      </Grid>
    </Formulario>
  );

  return <AppFrame titulo="Datos de Facturación" body={renderBody()} />;
};

export default DatosFacturacionContainer;
