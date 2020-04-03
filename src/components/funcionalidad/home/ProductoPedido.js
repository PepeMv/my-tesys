import React from "react";
import { Grid, IconButton, makeStyles, Typography, Box, useMediaQuery } from "@material-ui/core";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import Producto from "./Producto";


const useStyles = makeStyles(theme => ({ 
  contenedorContent: {
    padding: theme.spacing(1),
    textAlign: "center",    
  },
  contenedorCantidad: {
    textAlign: "center",
    margin: "auto",    
  },
  contenedorBotonQuitar: {
    textAlign: "center",
    margin: "auto",  
  },
}));

const  ProductoPedido = ({ producto, cantidad, preciototal, setListaPedidos, listapedidos, setProductoSelecionado, handleOpen, setTipoMostrarProducto }) => {
  const classes = useStyles();
  let pequenio = "";
  if (useMediaQuery(theme => theme.breakpoints.up("lg"))) {
    pequenio = true;
  } else {
    pequenio = false;
  }
  const actualizarProductoPedido = (producto, cantidad, preciototal) =>{
    setProductoSelecionado({producto, cantidad: cantidad, preciototal: preciototal});
    setTipoMostrarProducto('actualizar');
    handleOpen();
  }

  const borrarProductoPedido = (id) =>{
    /* const productosPedido = listapedidos.producto.filter(p => p.id !== id); */
    //reemplaxo el anterior arreglo de carrito 
    /* setListaPedidos(productosPedido); */
    const  productosPedido = listapedidos.filter( producto => producto.producto.id !== id );
    //console.log(productosPedido);
    setListaPedidos(productosPedido);
  }
  return (
    <div >
      <Grid container spacing={0} className={classes.contenedorContent}>
        <Grid item xs={1} className={classes.contenedorCantidad}>
        <Typography variant="h5">
              <Box fontWeight="fontWeightBold"> {cantidad} x </Box>
            </Typography>
        </Grid>
        <Grid item xs={9}>
            <Producto  pequenio={pequenio} producto={producto}/>
        </Grid>
        <Grid item xs={1} className={classes.contenedorCantidad}>
        <Typography variant="h5">
              <Box fontWeight="fontWeightBold">$ {preciototal}</Box>
            </Typography>
        </Grid>
        <Grid item xs={1} container direction='column' className={classes.contenedorBotonQuitar}>
        <Grid item xs={6} >
          <IconButton onClick={()=>actualizarProductoPedido( producto, cantidad, preciototal)}>
            <Edit fontSize='large' color='secondary'/>
          </IconButton>
        </Grid>
        <Grid item xs={6} >
          <IconButton onClick={()=>borrarProductoPedido(producto.id)}>
            <DeleteOutline fontSize='large' color='inherit'/>
          </IconButton>
        </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductoPedido;
