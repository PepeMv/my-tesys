import React, { useState, useEffect } from "react";
import {
  makeStyles,
  List,
  ListSubheader,
  Typography,
  Box,
  Button,
  Divider,
  Grid
} from "@material-ui/core";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import SendSharpIcon from "@material-ui/icons/SendSharp";
import ProductoPedido from "./ProductoPedido";
import uuid from "react-uuid";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  encabezadoMenu: {
    backgroundColor: "#ff5722",
    padding: theme.spacing(1.5),
    color: "#D1D1D1",
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center"
  },
  menuContenido: {
    color: "#000",
    paddingLeft: theme.spacing(5),
    padding: theme.spacing(2)
  },
  contenedorTituloSubtotal: {
    /* textAlign:'right' */
    textAlign: "left"
  },
  contenedorTabla: {
    color: theme.palette.text.secondary
  },
  contenedorPreciosTotalesl: {
    textAlign: "right"
  }
}));

const ListaPedido = ({
  listapedidos,
  setListaPedidos,
  setProductoSelecionado,
  handleOpen,
  setTipoMostrarProducto
}) => {
  const classes = useStyles();

  const [subtotal, setSubtotal] = useState(0);
  const [extras, setExtras] = useState(0);
  const [total, setTotal] = useState(0);

  const borrarPedido = () => {
    setListaPedidos([]);
  };

  useEffect(() => {
    const calcularValores = () => {
      var suma = 0;
      listapedidos.map(p => (suma += p.preciototal));
      setSubtotal(suma);
      //setear extras de algo con un state global
      setTotal(suma + extras);
    };
    calcularValores();
  }, [listapedidos]);

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

          <Button
            variant="contained"
            color="primary"
            startIcon={<DeleteOutline />}
            onClick={() => borrarPedido()}
          >
            <Typography variant="h6">
              <Box fontWeight="fontWeightBold">Borrar pedido</Box>
            </Typography>
          </Button>
        </ListSubheader>
      }
    >
      {listapedidos.length !== 0 ? (
        listapedidos.map(producto => (
          <div key={uuid()}>
            <ProductoPedido
              producto={producto.producto}
              cantidad={producto.cantidad}
              preciototal={producto.preciototal}
              setListaPedidos={setListaPedidos}
              setProductoSelecionado={setProductoSelecionado}
              handleOpen={handleOpen}
              listapedidos={listapedidos}
              setTipoMostrarProducto={setTipoMostrarProducto}
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
              <Box fontWeight="fontWeightBold" m={2} mt={10}>
                Subtotal:
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.contenedorPreciosTotalesl}>
            <Typography variant="h5">
              <Box fontWeight="fontWeightBold" m={2} mt={10} mr={8}>
                ${subtotal}
              </Box>
            </Typography>
          </Grid>
          {/* <Grid item xs={6} className={classes.contenedorTituloSubtotal}>
            <Typography variant="h5">
              <Box fontWeight="fontWeightBold" m={2}>
                Extras:
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.contenedorPreciosTotalesl}>
            <Typography variant="h5">
              <Box fontWeight="fontWeightBold" m={2} mr={8}>
                ${extras}
              </Box>
            </Typography>
          </Grid> */}
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
                ${total}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box fontWeight="fontWeightBold" m={4}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                startIcon={<SendSharpIcon />}
                /* onClick={() => borrarPedido()} */
              >
                <Typography variant="h6">Ordenar Ahora</Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      ) : null}
    </List>
  );
};

export default ListaPedido;
