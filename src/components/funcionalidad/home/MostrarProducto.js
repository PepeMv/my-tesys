import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  makeStyles,
  withStyles,
  ButtonGroup
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  img: {
    maxWidth: "80%",
    maxHeight: "80%"
  },
  contenedorContent: {
    padding: theme.spacing(2),
    justifyContent: "center",
    textAlign: "center"
  },
  contenedorInfo: {
    padding: theme.spacing(2)
  },
  colorTexto: {
    color: theme.palette.secondary
  },
  contenedorActions: {
    textAlign: "right",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center"
    }
  },
  contenedorBotonAumentar: {
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center"
    }
  },
  contenedorPrecioTotal: {
    textAlign: "left",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center"
    }
  }
}));

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h4">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const MostrarProducto = ({
  open,
  handleClose,
  producto,
  cantidad,
  preciototal,
  setProductoSelecionado,
  listapedidos,
  setListaPedidos,
  tipomostrarproducto,
  setTipoMostrarProducto
}) => {
  
  const classes = useStyles();
  const value = 4;
  const [cantidadAqui, setCantidadAqui] = useState();
  const [preciototalAqui, setPrecioTotalAqui] = useState();
  const [disabledMenos, setDisabledMenos] = useState();
  const [disabledMas, setDisabledMas] = useState();
  
  const imagen = useSelector( (state)=> state.productos.imagenes.find( img => img.id === producto.id).url); 

  useEffect(() => {
    const revisarBotonesModificadoresCabtidad = () => {
      if (cantidad === 1) {
        setDisabledMenos(true);
        setDisabledMas(false);
      } else if (cantidad > 1) {
        setDisabledMenos(false);
        setDisabledMas(false);
      } else if (cantidad < 1) {
        setCantidadAqui(1);
        setDisabledMenos(true);
        setDisabledMas(false);
      }
    };    
    revisarBotonesModificadoresCabtidad();
  }, []);  

  const revisarBotonesModificadoresCabtidad = valor => {
    if (valor === 1) {
      setDisabledMenos(true);
      setDisabledMas(false);
    } else if (valor > 1) {
      setDisabledMenos(false);
      setDisabledMas(false);
    } else if (valor < 1) {
      setCantidadAqui(1);
      setDisabledMenos(true);
      setDisabledMas(false);
    }
  };

  const actualizarProductoPedido = (producto, cantidad, preciototal) => {
    //console.log(producto, cantidad, preciototal);
    if (cantidad === undefined || preciototal === undefined) {
    } else {
      setListaPedidos(
        listapedidos.map(p =>
          p.producto.id === producto.id
            ? (p = { producto, cantidad, preciototal })
            : p
        )
      );
    }
    cerrarYBorrarProductoSelecionado();
  };
  const addListaPedidos = (producto, cantidad, preciototal) => {
    //console.log(preciototal, cantidad, producto.precio);
    let estaYaPedido = false;

    listapedidos.map(p =>
      p.producto.id === producto.id
        ? (estaYaPedido = true)
        : (estaYaPedido = false)
    );

    if (estaYaPedido) {
      if (cantidad === undefined || preciototal === undefined) {
        actualizarProductoPedido(producto,1,parseFloat(producto.precio));
      }else{
        actualizarProductoPedido(producto, cantidad, preciototal);
      }
    } else {
      if (cantidad === undefined || preciototal === undefined) {
        setListaPedidos([
          ...listapedidos,
          { producto, cantidad: 1, preciototal: parseFloat(producto.precio) }
        ]);
      } else {
        setListaPedidos([...listapedidos, { producto, cantidad, preciototal }]);
      }
    }

    cerrarYBorrarProductoSelecionado();
  };
  const cerrarYBorrarProductoSelecionado = () => {
    setPrecioTotalAqui(undefined);
    setCantidadAqui(undefined);
    setTipoMostrarProducto("");
    //setProductoSelecionado(null);
    handleClose();
    /* setPrecioTotal(producto.precio); */
  };
  const botonAumentarCantidad = () => {
    if (cantidadAqui === undefined) {
      if (cantidad > 1 || cantidad === 1) {
        revisarBotonesModificadoresCabtidad(cantidad + 1);
        setPrecioTotalAqui(producto.precio * (cantidad + 1));
        setCantidadAqui(cantidad + 1);
      }
    } else {
      if (cantidadAqui > 1 || cantidad === 1) {
        revisarBotonesModificadoresCabtidad(cantidadAqui + 1);
        setPrecioTotalAqui(producto.precio * (cantidadAqui + 1));
        setCantidadAqui(cantidadAqui + 1);
      }
    }
    //setPrecioTotalAqui(cantidad*preciototal);
  };

  const botonDisminuirCantidad = () => {
    if (cantidadAqui === undefined) {
      if (cantidad > 1) {
        revisarBotonesModificadoresCabtidad(cantidad - 1);
        setPrecioTotalAqui(producto.precio * (cantidad - 1));
        setCantidadAqui(cantidad - 1);
      }
    } else {
      if (cantidadAqui > 1) {
        revisarBotonesModificadoresCabtidad(cantidadAqui - 1);
        setPrecioTotalAqui(producto.precio * (cantidadAqui - 1));
        setCantidadAqui(cantidadAqui - 1);
      }
    }
    //setPrecioTotalAqui(cantidad*preciototal);
  };

  if (producto !== null) {
    return (
      <Dialog
        maxWidth="xs"
        open={open}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-titlePedido"
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={cerrarYBorrarProductoSelecionado}
        >
          <Box fontWeight="fontWeightBold" m={0}>
            {producto.nombre}
          </Box>
        </DialogTitle>
        <DialogContent dividers={true}>
          <Grid container spacing={2}>
            <Grid item xs={12} className={classes.contenedorContent}>
              <img
                className={classes.img}
                alt="complex"
                src={imagen}
              />
            </Grid>
            <Grid item xs={12} className={classes.contenedorContent}>
              <Box fontWeight="fontWeightBold" m={1}>
                <Typography variant="h5">Calificación</Typography>
                <Rating
                  name="hover-feedback"
                  value={value}
                  precision={1}
                  readOnly
                  size="large"
                />
              </Box>
            </Grid>
            <Grid item xs={12} className={classes.contenedorInfo}>
              <Typography variant="h4">
                <Box fontWeight="fontWeightBold" m={1}>
                  {producto.nombre}
                </Box>
              </Typography>
              <Typography variant="h5">
                <Box m={1}>{producto.descripcion}</Box>
              </Typography>
              <Typography variant="h5" color="secondary">
                <Box fontWeight="fontWeightBold" m={1}>
                  $.{producto.precio}
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={1}>
            <Grid item xs={4} sm={4}>
              {/* valor calculado */}
              <Typography variant="h4" color="secondary">
                <Box fontWeight="fontWeightBold" m={0}>
                  ${" "}
                  {preciototalAqui === undefined
                    ? producto.precio * cantidad
                    : preciototalAqui}
                </Box>
              </Typography>
            </Grid>
            <Grid
              item
              xs={8}
              sm={4}
              className={classes.contenedorBotonAumentar}
            >
              {/* incrementar cantidad */}
              <ButtonGroup color="primary">
                <Button
                  disabled={disabledMenos}
                  onClick={() => botonDisminuirCantidad()}
                >
                  -
                </Button>
                <Button disabled>
                  <Typography variant="h5" color="secondary">
                    <Box fontWeight="fontWeightBold" m={0}>
                      {cantidadAqui === undefined ? cantidad : cantidadAqui}
                    </Box>
                  </Typography>
                </Button>
                <Button
                  disabled={disabledMas}
                  onClick={() => botonAumentarCantidad()}
                >
                  +
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.contenedorActions}>
              {/* //añadir al carrito */}
              {tipomostrarproducto === "actualizar" ? (
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() =>
                    actualizarProductoPedido(
                      producto,
                      cantidadAqui,
                      preciototalAqui
                    )
                  }
                >
                  <Typography variant="h6">Actualizar</Typography>
                </Button>
              ) : (
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() =>
                    addListaPedidos(producto, cantidadAqui, preciototalAqui)
                  }
                >
                  <Typography variant="h6">Lo quiero</Typography>
                </Button>
              )}
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    );
  } else {
    return null;
  }
};

export default MostrarProducto;
