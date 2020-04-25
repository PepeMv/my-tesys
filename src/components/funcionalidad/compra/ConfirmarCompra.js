import React, { useState } from "react";
import AppFrame from "../../layout/AppFrame";
import {
  Grid,
  makeStyles,
  Typography,
  Box,
  Paper,
  List,
  ListSubheader,
  Button,
} from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import SendSharpIcon from "@material-ui/icons/SendSharp";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
import ListaPedidoConfirmar from "../home/ListaPedidoConfirmar";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./../../layout/Modal";
import MostrarDatosFacturacion from "./MostrarDatosFacturacion";
import {insertarPedidoAction} from './../../../actions/pedidosActions';
import Spinner from "../../layout/Spinner";


const useStyles = makeStyles((theme) => ({
  datos: {
    //height: "200px",
    width: "100%",
    //backgroundColor: "red",
    margin: "auto",
  },
  pedido: {
    width: "100%",
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    //width: "100%",
    display: "flex",
    alignItems: "center",
    //textAlign: 'center'
  },
  encabezadoMenu: {
    backgroundColor: "#1976D2",
    padding: theme.spacing(1.5),
    color: "#D1D1D1",
    justifyContent: "space-between",
    width: "100%",
    display: "flex",
  },
  lista: {
    width: "100%",
  },
  encabezadoDatosFact: {
    backgroundColor: "#ff5722",
    padding: theme.spacing(1.5),
    color: "#D1D1D1",
    justifyContent: "space-between",
    width: "100%",
    display: "flex",
  },
  centrar: {
    justifyContent: "center",
    margin: "auto",
    display: "flex",
  },
}));

const ConfirmarCompra = () => {
  const distpach = useDispatch();
  const datosFacturacion = useSelector( (state) => state.logeo.datosFacturacion);
  const usuario = useSelector( (state) => state.logeo.usuarioInfo );
  /* const datosFacturacion = [
    {
      id: "1",
      tipoDocumento: "cedula",
      numeroDocumento: "1801760685",
      nombre: "Julio Mesias",
      direccion: "Ambato",
      telefono: "0997336432",
      idUsuario: "3",
    },
    {
      id: "2",
      tipoDocumento: "cedula",
      numeroDocumento: "1801760689",
      nombre: "Andres valencia",
      direccion: "Patate",
      telefono: "0997336582",
      idUsuario: "3",
    },
  ];

  const usuario = { id: '2', nombre: 'David Mesias', numeroDocumento:'1804569364'}; */

  const loading = useSelector((state) => state.pedidos.loading);
  const iva = useSelector( (state) => state.restaurante.restauranteInfo.iva );
  const history = useHistory();
  const location = useLocation();
  const tipopedido = location.state.tipopedido;
  const total = location.state.total;
  const subtotal = location.state.subtotal;
  const listapedidos = location.state.listapedidos;
  const lugar = location.state.lugar;
  const extra = useSelector(
    (state) => state.restaurante.restauranteInfo.costoEnvio
  );
  const [abriropcionesdatos, setAbrirOpcionesDatos] = useState(false);
  const [datodeFacturacion, setSelectDatoFacturacion] = useState(datosFacturacion[0]);
  
  const handleOpenOpcionesDatos = () => {
    setAbrirOpcionesDatos(true);
  };
  const handleCloseOpcionesDatos = () => {
    setAbrirOpcionesDatos(false);
  };

 

  async function guardarPedido () {
    const respuesta = await distpach( insertarPedidoAction( total, subtotal, tipopedido, usuario, datodeFacturacion, listapedidos, extra, lugar, iva ) );
    if(respuesta === "success"){
      history.push("/");
    }
  }

  const classes = useStyles();
  const renderBody = () => (
    <div>
      <Spinner active={loading} />
      <Grid container spacing={0}>
        <Grid item lg={7} sm={12}>
          <Paper className={classes.paper}>
            <List
              component="nav"
              subheader={
                <ListSubheader
                  component="div"
                  color="primary"
                  className={classes.encabezadoMenu}
                >
                  <Typography variant="h4">
                    <Box fontWeight="fontWeightBold" m={1}>
                      Informacion de entrega
                    </Box>
                  </Typography>
                </ListSubheader>
              }
              className={classes.lista}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    <Box fontWeight="" m={1} mt={2}>
                      El pedido se entrega a: {tipopedido}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    <Box fontWeight="fontWeightBold" m={1} mb={2}>
                      {lugar.nombre}
                    </Box>
                  </Typography>
                </Grid>
              </Grid>
            </List>
          </Paper>
          {/* datos de facturacio ------------------------------------------------------------------------------------------- */}
          <Paper className={classes.paper}>
            <List
              component="nav"
              subheader={
                <ListSubheader
                  component="div"
                  color="primary"
                  className={classes.encabezadoDatosFact}
                >
                  <Typography variant="h4">
                    <Box fontWeight="fontWeightBold" m={1}>
                      Datos de Facturación
                    </Box>
                  </Typography>
                </ListSubheader>
              }
              className={classes.lista}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h5">
                    <Box fontWeight="fontWeightBold" m={1} mb={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box fontWeight="fontWeightBold" ml={1}>
                            <Typography variant="h5">
                              {datodeFacturacion.nombre}
                            </Typography>
                          </Box>
                          <Box fontWeight="" ml={1}>
                            <Typography variant="h5">
                              {datodeFacturacion.numeroDocumento}
                            </Typography>
                          </Box>
                          <Box fontWeight="" ml={1}>
                            <Typography variant="h5">
                              {datodeFacturacion.direccion}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={6} className={classes.centrar}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenOpcionesDatos()}
                  >
                    <Typography variant="h5">
                      <Box fontWeight="fontWeightBold" m={1}>
                        Cambiar
                      </Box>
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </List>
          </Paper>
        </Grid>
        <Grid item lg={5} sm={12} className={classes.pedido}>
          <Paper className={classes.paper}>
            <ListaPedidoConfirmar
              total={total}
              subtotal={subtotal}
              listapedidos={listapedidos}
              tipopedido={tipopedido}
              extra={extra}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} className={classes.pedido}>
          <Box m={1} pl={4} pr={4} p={2}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              startIcon={<ArrowBackIosSharpIcon />}
              onClick={() => history.goBack()}
            >
              <Box m={1}>
                <Typography variant="h5">Regresar</Typography>
              </Box>
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className={classes.pedido}>
          <Box m={1} pl={4} pr={4} p={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<SendSharpIcon />}
              onClick={() => guardarPedido()}
            >
              <Box m={1}>
                <Typography variant="h5">Ordenar YA!</Typography>
              </Box>
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={abriropcionesdatos}
        handleClose={handleCloseOpcionesDatos}
        titulo="Tus datos de Facturación"
        contenido={ <MostrarDatosFacturacion data={datosFacturacion} setSelectDatoFacturacion={setSelectDatoFacturacion} handleClose={handleCloseOpcionesDatos}/> }
      />
    </div>
  );

  return <AppFrame titulo="Confirma tus datos" body={renderBody()} />;
};

export default ConfirmarCompra;
