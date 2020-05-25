import React, { useState, useEffect } from "react";
import {
  makeStyles,
  List,
  ListSubheader,
  Typography,
  Box,
  Button,
  Divider,
  Grid,
  useMediaQuery
} from "@material-ui/core";
//import DeleteOutline from "@material-ui/icons/DeleteOutline";
import SendSharpIcon from "@material-ui/icons/SendSharp";
import {  useHistory } from 'react-router-dom';
import uuid from "react-uuid";
import { Alert } from "@material-ui/lab";
import {  useDispatch, useSelector } from 'react-redux';
import ProductoPedido from "./ProductoPedido";
import {obtenerNumeroItemsPedidoAction} from './../../../actions/pedidosActions';
import {alertaConfirmacion} from './../../layout/AlertaCRUD';

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
  },
  lista: {
    width: "100%",
  },
}));

const ListaPedido = ({
  listapedidos,
  setListaPedidos,
  setProductoSelecionado,
  handleOpen,
  setTipoMostrarProducto,
  tipopedido,
  productoEditable,
  lugar
}) => {
  
  const history = useHistory();
  const distpach = useDispatch();
  const classes = useStyles();
  const [subtotal, setSubtotal] = useState(0);
  //const [extras, setExtras] = useState(0);
  const [total, setTotal] = useState(0);
  const logeado = useSelector((state) => state.logeo.autenticado);
  const rol = useSelector( (state) => state.logeo.usuarioInfo );

  useEffect(() => {
    const calcularValores = () => {
      var suma = 0;
      listapedidos.map(p => (suma += p.preciototal));
      setSubtotal(suma.toFixed(2));
      //setear extras de algo con un state global
      const total = suma+0;

      setTotal(total.toFixed(2));
      distpach(obtenerNumeroItemsPedidoAction(listapedidos.length));
    };
    calcularValores();
    //eslint-disable-next-line
  }, [listapedidos]);

  const confirmarOrdenRedireccion = () =>{

    if(!logeado){
      alertaConfirmacion('Error','Para proceder debes inciar sesión','error');
    } else if (rol.tipoUsuario==="cliente") {
      if (tipopedido === ""){
        alertaConfirmacion('Error','Elije un metodo de entrega','error');
      }else if(listapedidos.length === 0) {
        alertaConfirmacion('Error','Debes elejir uno o mas productos','error');
      } else {
        history.push('/confirmarCompra', {listapedidos, subtotal, total, tipopedido, lugar});
      }
    } else {
      alertaConfirmacion('Error','Para hacer pedidos debe ser cliente','error');
    }
    
  }
  
  let pequenio = "";
  if (useMediaQuery(theme => theme.breakpoints.up("lg"))) {
    pequenio = true;
  } else {
    pequenio = false;
  }
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
               {tipopedido ? `A ${tipopedido}` : "Elije ubicacion o qr de una mesa!"}
            </Box>
          </Typography>        
        </ListSubheader>
      }
      className={classes.lista}
    >
      {listapedidos.length !== 0 ? (
        listapedidos.map(producto => (
          <div key={uuid()}>
            <ProductoPedido
            pequenio={pequenio}
            productoEditable={productoEditable}
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
            <Box fontWeight="fontWeightBold" m={2}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                startIcon={<SendSharpIcon />}
                onClick={() => confirmarOrdenRedireccion()}
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
