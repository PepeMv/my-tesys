import React from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Box,
  Paper,
  IconButton
} from "@material-ui/core";
import AddBoxTwoToneIcon from "@material-ui/icons/AddBoxTwoTone";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
    /* color: theme.palette.text.secondary, */
  },
  contenedorImg: {
    backgroundColor: "red",
    minWidth: "70px"
  },
  contenedorInfo: {
    backgroundColor: "yellow"
  },
  contenedorPrecio: {
    textAlign: "left"
  },
  contenedorPrecio1: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "50",
    height: "60px"
  },
  img: {
    maxWidth: "100px",
    maxHeight: "100px"
  }
}));

const Producto = ({
  producto,
  setProductoSelecionado,
  handleOpen,
  tipo,
  pequenio
}) => {
  const imagen = useSelector( (state)=> state.productos.imagenes.find( img => img.id === producto.id).url); 
  const classes = useStyles();
  const abriryPasarProducto = producto => {    
    setProductoSelecionado({producto, cantidad: parseInt(1), preciototal: parseFloat(producto.precio)});
    handleOpen();
  };  

let valorenLg="";
  if (pequenio){
    valorenLg=12;
  }else{
   valorenLg=null;
  }
  return (    
    <Paper className={classes.paper}>
      <Grid container spacing={2} >
        {/* foto */}
        <Grid item xs={12} sm={3} lg={valorenLg} >
          <img className={classes.img} alt="complex" src={imagen} />
        </Grid>
        <Grid item xs={12} sm={9} lg={valorenLg}>
          <Grid item container spacing={1} >
            <Grid item xs={10} className={classes.contenedorPrecio}>
              <Typography gutterBottom variant="h5">
                <Box fontWeight="fontWeightBold" m={0}>
                  {producto.nombre}
                </Box>
              </Typography>
              <Typography variant="h6" gutterBottom>
                {producto.descripcion}
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.contenedorPrecio1}>
              <Typography gutterBottom variant="h5">
                <Box
                  fontWeight="fontWeightBold"
                  m={0}
                  component="div"
                  textOverflow="clip"
                  overflow="hidden"
                >
                  $ {producto.precio}
                </Box>
              </Typography>
              {tipo === "add" ? (
                <IconButton onClick={() => abriryPasarProducto(producto)}>
                  <AddBoxTwoToneIcon fontSize="large" color="secondary" />
                </IconButton>
              ) : (null)}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Producto;
