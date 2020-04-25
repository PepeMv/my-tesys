import React from "react";
import AppFrame from "../../layout/AppFrame";
import Spinner from "../../layout/Spinner";
import {
  makeStyles,
  Grid,
  List,
  ListSubheader,
  Typography,
  Box,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useSelector } from "react-redux";
import CardOrden from "../ordenes/CardOrden";
import uuid from "react-uuid";

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

const MisPedidos = () => {
  const loading = false;
  const classes = useStyles();

  const pedidosState = useSelector((state) => state.logeo.pedidos);
  const detallesState = useSelector((state) => state.logeo.detalles);

  const renderBody = () => (
    <div>
      {loading ? (
        <Spinner active={loading} />
      ) : (
        <div className={classes.contenedorGeneral}>
          <Grid container spacing={0} display="inline">
            <Grid item xs={12} className={classes.contenedorMesas}>
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
                        Tus Pedidos
                      </Box>
                    </Typography>
                  </ListSubheader>
                }
                className={classes.lista}
              >
                <Grid container spacing={2}>
                  {pedidosState.length !== 0 ? (
                    pedidosState.map((pedido) => (
                      <Grid item xs={12} md={4} key={uuid()}>
                        <CardOrden
                          editable='ver'
                          pedido={pedido}
                          detalle={detallesState.filter(
                            (detalle) => detalle.idPedido === pedido.id
                          )}
                        />
                      </Grid>
                    ))
                  ) : (
                    <Box m={2}>
                      <Alert severity="warning">
                        <Typography variant="h6">No tienes pedidos!</Typography>
                      </Alert>
                    </Box>
                  )}
                </Grid>
              </List>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );

  return (
    <AppFrame titulo="Mis Pedidos" body={renderBody()} />
  );
};

export default MisPedidos;
