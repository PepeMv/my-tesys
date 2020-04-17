import React, { Fragment, useState, useEffect } from "react";
import {
  makeStyles,
  List,
  ListSubheader,
  Typography,
  Box,
  Divider,
  Grid,
} from "@material-ui/core";

import uuid from "react-uuid";
import { Alert } from "@material-ui/lab";
import ProductoPedido from "./ProductoPedido";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  encabezadoMenu: {
    backgroundColor: "#ff5722",
    padding: theme.spacing(1.5),
    color: "#D1D1D1",
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center",
  },
  menuContenido: {
    color: "#000",
    paddingLeft: theme.spacing(5),
    padding: theme.spacing(2),
  },
  contenedorTituloSubtotal: {
    /* textAlign:'right' */
    textAlign: "left",
  },
  contenedorTabla: {
    color: theme.palette.text.secondary,
  },
  contenedorPreciosTotalesl: {
    textAlign: "right",
  },
  lista: {
    width: "100%",
  },
}));

const ListaPedidoConfirmar = ({
  total,
  subtotal,
  listapedidos,
  tipopedido,
  extra,
}) => {
  const classes = useStyles();
  const [totalgeneral, setTotalgeneral] = useState(0);
  useEffect(() => {
    obtenerTotalGeneral(tipopedido);
  }, []);

  const obtenerTotalGeneral = (tipoDePedido) => {
    if (tipoDePedido === "DOMICILIO") {
      const valor = parseFloat(total) + parseFloat(extra);
      setTotalgeneral(valor.toFixed(2));
    } else {
      setTotalgeneral(total);
    }
  };
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="encabezado-menu"
          color="primary"
          className={classes.encabezadoMenu}
        >
          <Typography variant="h4">
            <Box fontWeight="fontWeightBold" m={1}>
              Tu orden
            </Box>
          </Typography>

          <Typography variant="h5">
            <Box fontWeight="fontWeightBold" m={1}>
              {tipopedido
                ? `A ${tipopedido}`
                : "Elije ubicacion o qr de una mesa!"}
            </Box>
          </Typography>
        </ListSubheader>
      }
      className={classes.lista}
    >
      {listapedidos.length !== 0 ? (
        listapedidos.map((producto) => (
          <div key={uuid()}>
            <ProductoPedido
              productoEditable={false}
              producto={producto.producto}
              cantidad={producto.cantidad}
              preciototal={producto.preciototal}
            />
            <Divider />
          </div>
        ))
      ) : (
        <Box m={2}>
          <Alert severity="warning">
            <Typography variant="h6">
              No has selecionado ningun producto!
            </Typography>
          </Alert>
        </Box>
      )}

      {listapedidos.length !== 0 ? (
        <Grid container spacing={2} className={classes.contenedorTabla}>
          <Grid item xs={6} className={classes.contenedorTituloSubtotal}>
            <Typography variant="h5">
              <Box fontWeight="fontWeightBold" m={2} mt={3}>
                Subtotal:
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.contenedorPreciosTotalesl}>
            <Typography variant="h5">
              <Box fontWeight="fontWeightBold" m={2} mt={3} mr={8}>
                ${subtotal}
              </Box>
            </Typography>
          </Grid>
          {tipopedido === "DOMICILIO" ? (
            <Fragment>
              <Grid item xs={6} className={classes.contenedorTituloSubtotal}>
                <Typography variant="h5">
                  <Box fontWeight="fontWeightBold" m={2} mt={3}>
                    Costo de envio:
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={6} className={classes.contenedorPreciosTotalesl}>
                <Typography variant="h5">
                  <Box fontWeight="fontWeightBold" m={2} mt={3} mr={8}>
                    ${extra}
                  </Box>
                </Typography>
              </Grid>
            </Fragment>
          ) : null}
          <Grid item xs={12} className={classes.contenedorPreciosTotalesl}>
            <Typography variant="h5">
              <Box fontWeight="fontWeightBold">
                <Divider variant="fullWidth" />
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.contenedorTituloSubtotal}>
            <Typography variant="h4">
              <Box fontWeight="fontWeightBold" m={3}>
                Total:
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.contenedorPreciosTotalesl}>
            <Typography variant="h4">
              <Box fontWeight="fontWeightBold" m={3} mr={8}>
                $ {totalgeneral}
              </Box>
            </Typography>
          </Grid>
        </Grid>
      ) : null}
    </List>
  );
};

export default ListaPedidoConfirmar;
