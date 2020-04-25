import React, { Fragment, useRef } from "react";
import {
  Grid,
  makeStyles,
  Box,
  Avatar,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import uuid from "react-uuid";
import moment from "moment";
import "moment/locale/es";
import { useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";
import ReactToPrint from "react-to-print";

const useStyles = makeStyles((theme) => ({
  contenedorGeneral: {
    textAlign: "center",
    maxWidth:'400px'
  },
  factura:{
      maxWidth:'250px',
      width: '250px'
  }
}));

const Factura = ({ detalleTemporal, pedidoTemporal }) => {
  const componentRef = useRef(null);
  const classes = useStyles();
  const restaurante = useSelector((state) => state.restaurante);
  return (
    <Fragment>
      <Fragment >
        {detalleTemporal.length !== 0 ? (
          <Grid container spacing={1} className={classes.contenedorGeneral} ref={componentRef}>
            <Fragment>
              <Grid item xs={3}>
                <Box fontWeight="" m={0.5}>
                  <Avatar src={restaurante.imagenes.logo} />
                </Box>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h4">
                  <Box fontWeight="fontWeightBold" m={0.5}>
                    {restaurante.restauranteInfo.nombre}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6">
                  <Box fontWeight="fontWeightBold" m={0}>
                    Nº Orden:
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Box fontWeight="fontWeightBold" m={0}>
                  <Typography variant="h6">
                    {pedidoTemporal.numeroPedido}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6">
                  <Box fontWeight="fontWeightBold" m={0}>
                    Fecha/Hora:
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Box fontWeight="fontWeightBold" m={0}>
                  <Typography variant="h6">
                    {moment
                      .utc(pedidoTemporal.fechahoraPedido)
                      .format("MMM D YY, h:mm a")}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6">
                  <Box fontWeight="fontWeightBold" m={0}>
                    Cliente:
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Box fontWeight="fontWeightBold" m={0}>
                  <Typography variant="h6">
                    {pedidoTemporal.nombreCliente}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6">
                  <Box fontWeight="fontWeightBold" m={0}>
                    CI/RUC:
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Box fontWeight="fontWeightBold" m={0}>
                  <Typography variant="h6">
                    {pedidoTemporal.numeroDocumento}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6">
                  <Box fontWeight="fontWeightBold" m={0}>
                    Entregar:
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Box fontWeight="fontWeightBold" m={0}>
                  <Typography variant="h6">
                    {pedidoTemporal.entregarPedido}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Fragment>
            <Fragment>
              <Grid item xs={3}>
                <Typography variant="h5">
                  <Box fontWeight="fontWeightBold" m={0.5}>
                    Nombre
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h5">
                  <Box fontWeight="fontWeightBold" m={0.5}>
                    Cantidad
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h5">
                  <Box fontWeight="fontWeightBold" m={0.5}>
                    Precio U
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h5">
                  <Box fontWeight="fontWeightBold" m={0.5}>
                    Total
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Fragment>
            <Grid container spacing={0} className={classes.contenedorGeneral}>
              {detalleTemporal.map((item) => (
                <Fragment key={uuid()}>
                  <Grid item xs={3}>
                    <Box fontFamily="" m={0.5}>
                      <Typography variant="h6">
                        {item.nombreProducto}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box fontFamily="" m={0.5}>
                      <Typography variant="h6">
                        {item.cantidadProducto}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box fontFamily="" m={0.5}>
                      <Typography variant="h6">
                        {(
                          parseFloat(item.precioProducto) -
                          parseFloat(item.precioProducto) *
                            (parseFloat(pedidoTemporal.iva) / 100)
                        ).toFixed(2)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box fontFamily="" m={0.5}>
                      <Typography variant="h6">
                        {(
                          parseFloat(item.subtotalDetalle) -
                          parseFloat(item.subtotalDetalle) *
                            (parseFloat(pedidoTemporal.iva) / 100)
                        ).toFixed(2)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Fragment>
              ))}
              {pedidoTemporal.tipoPedido === "DOMICILIO" ? (
                <Fragment>
                  <Grid item xs={9}>
                    <Box fontFamily="" m={0.5}>
                      <Typography variant="h6">Costo de Envio:</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box fontFamily="" m={0.5}>
                      <Typography variant="h6">
                        {(
                          parseFloat(pedidoTemporal.costoEnvio) -
                          parseFloat(pedidoTemporal.costoEnvio) *
                            (parseFloat(pedidoTemporal.iva) / 100)
                        ).toFixed(2)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Fragment>
              ) : null}
              <Grid item xs={9}>
                <Box fontFamily="" m={0.5}>
                  <Typography variant="h6">Subtotal:</Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box fontFamily="" m={0.5}>
                  <Typography variant="h6">
                    {(
                      parseFloat(pedidoTemporal.totalPedido) -
                      parseFloat(pedidoTemporal.totalPedido) *
                        (parseFloat(pedidoTemporal.iva) / 100)
                    ).toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={9}>
                <Box fontFamily="" m={0.5}>
                  <Typography variant="h6">
                    IVA {pedidoTemporal.iva}%:
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box fontFamily="" m={0.5}>
                  <Typography variant="h6">
                    {(
                      parseFloat(pedidoTemporal.totalPedido) *
                      (parseFloat(pedidoTemporal.iva) / 100)
                    ).toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h5">
                  <Box fontWeight="fontWeightBold" m={0.5}>
                    Total:
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Box fontWeight="fontWeightBold" m={0.5}>
                  <Typography variant="h5">
                    {parseFloat(pedidoTemporal.totalPedido).toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Box m={2} width="100%">
            <Alert severity="warning">
              <Typography variant="h6">No hay detalles!</Typography>
            </Alert>
          </Box>
        )}
      </Fragment>
      <Box m={1}>
        <ReactToPrint
          trigger={() => (
            <Button variant="contained" color="primary" fullWidth>
              <Typography variant="h5"> Imprimir </Typography>
            </Button>
          )}
          content={() => componentRef.current}
          pageStyle={classes.factura}
          bodyClass={classes.factura}
        />
      </Box>
    </Fragment>
  );
};

export default Factura;
