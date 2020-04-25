import React, { useEffect } from "react";
import AppFrame from "../../layout/AppFrame";
import {
  Grid,
  makeStyles,
  Box,
  Typography,
  List,
  ListSubheader,
} from "@material-ui/core";
import uuid from "react-uuid";
import { Alert } from "@material-ui/lab";
//redux
import { useDispatch, useSelector } from "react-redux";
//websockets
import CardOrden from "./CardOrden";
import { obtenerPedidosParaEntregarAction } from "../../../actions/pedidosActions";
import Spinner from "../../layout/Spinner";

const useStyles = makeStyles((theme) => ({
  contenedorGeneral: {
    display: "flex",
    flexWrap: "wrap",
    textAlign: "center",
    height: "100%",
    width: "100%",
    padding: theme.spacing(1),
    backgroundColor: "white",
    position: "static",
  },
  contenedorMesas: {
    position: "relative",
    border: "solid",
    borderColor: "#1976D2",
  },
  contenedorDomicilio: {
    position: "relative",
    border: "solid",
    borderColor: "#ff5722",
  },
  contenedorLlevar: {
    overflow: "auto",
    border: "solid",
    borderColor: "#1976D2",
  },
  encabezadoOrdenesMesas: {
    backgroundColor: "#1976D2",
    padding: theme.spacing(1.5),
    color: "#D1D1D1",
    justifyContent: "space-between",
    width: "100%",
    display: "flex",
  },
  encabezadoOrdenesDomicilio: {
    backgroundColor: "#ff5722",
    padding: theme.spacing(1.5),
    color: "#D1D1D1",
    justifyContent: "space-between",
    width: "100%",
    display: "flex",
  },
  encabezadoOrdenesLlevar: {
    backgroundColor: "#1976D2",
    padding: theme.spacing(1.5),
    color: "#D1D1D1",
    justifyContent: "space-between",
    width: "100%",
    display: "flex",
  },
}));

const MostrarOrdenesEntregar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    const traerPedidosEntregar = () =>
      dispatch(obtenerPedidosParaEntregarAction());
    traerPedidosEntregar();
    //eslint-disable-next-line
  }, []);

  const loading = useSelector((state) => state.pedidos.loading);
  const ordenesState = useSelector(
    (state) => state.pedidos.pedidosParaEntregar
  );
  const detallesState = useSelector(
    (state) => state.pedidos.detallesParaEntregar
  );

  const pedidosMesa = ordenesState.filter(
    (pedido) =>
      pedido.tipoPedido === "MESA" && pedido.entregarPedido !== "Llevar"
  );
  const pedidosDomicilio = ordenesState.filter(
    (pedido) => pedido.tipoPedido === "DOMICILIO"
  );
  const pedidosLlevar = ordenesState.filter(
    (pedido) =>
      pedido.entregarPedido === "Llevar" || pedido.entregarPedido === "LLEVAR"
  );

  const renderBody = () => (
    <div className={classes.contenedorGeneral}>
      <Spinner active={loading} />
      <Grid container spacing={0} display="inline">
        <Grid item xs={12} md={4} className={classes.contenedorMesas}>
          <List
            component="nav"
            subheader={
              <ListSubheader
                component="div"
                color="primary"
                className={classes.encabezadoOrdenesMesas}
              >
                <Typography variant="h4">
                  <Box fontWeight="fontWeightBold" m={1}>
                    Ordenes a Mesa
                  </Box>
                </Typography>
              </ListSubheader>
            }
            className={classes.lista}
          >
            {pedidosMesa.length !== 0 ? (
              pedidosMesa.map((pedido) => (
                <CardOrden
                  key={uuid()}
                  editable="entregar"
                  pedido={pedido}
                  detalle={detallesState.filter(
                    (detalle) => detalle.idPedido === pedido.id
                  )}
                />
              ))
            ) : (
              <Box m={2}>
                <Alert severity="warning">
                  <Typography variant="h6">
                    No hay ordenes a mesas activas!
                  </Typography>
                </Alert>
              </Box>
            )}
          </List>
        </Grid>

        <Grid item xs={12} md={4} className={classes.contenedorDomicilio}>
          <List
            component="nav"
            subheader={
              <ListSubheader
                component="div"
                color="primary"
                className={classes.encabezadoOrdenesDomicilio}
              >
                <Typography variant="h4">
                  <Box fontWeight="fontWeightBold" m={1}>
                    Ordenes a Domicilio
                  </Box>
                </Typography>
              </ListSubheader>
            }
            className={classes.lista}
          >
            {pedidosDomicilio.length !== 0 ? (
              pedidosDomicilio.map((pedido) => (
                <CardOrden
                  key={uuid()}
                  editable="entregar"
                  pedido={pedido}
                  detalle={detallesState.filter(
                    (detalle) => detalle.idPedido === pedido.id
                  )}
                />
              ))
            ) : (
              <Box m={2}>
                <Alert severity="warning">
                  <Typography variant="h6">
                    No hay ordenes a domicilio activas!
                  </Typography>
                </Alert>
              </Box>
            )}
          </List>
        </Grid>

        <Grid item xs={12} md={4} className={classes.contenedorLlevar}>
          <List
            component="nav"
            subheader={
              <ListSubheader
                component="div"
                color="primary"
                className={classes.encabezadoOrdenesLlevar}
              >
                <Typography variant="h4">
                  <Box fontWeight="fontWeightBold" m={1}>
                    Ordenes para Llevar
                  </Box>
                </Typography>
              </ListSubheader>
            }
            className={classes.lista}
          >
            {pedidosLlevar.length !== 0 ? (
              pedidosLlevar.map((pedido) => (
                <CardOrden
                  key={uuid()}
                  editable="entregar"
                  pedido={pedido}
                  detalle={detallesState.filter(
                    (detalle) => detalle.idPedido === pedido.id
                  )}
                />
              ))
            ) : (
              <Box m={2}>
                <Alert severity="warning">
                  <Typography variant="h6">
                    No hay ordenes para llevar activas!
                  </Typography>
                </Alert>
              </Box>
            )}
          </List>
        </Grid>
      </Grid>
    </div>
  );

  return <AppFrame titulo="Pedidos para Entregar" body={renderBody()} />;
};

export default MostrarOrdenesEntregar;
