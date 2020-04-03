import React from "react";
import {
  makeStyles,
  List,
  ListSubheader,
  Typography,
  Box,
  Divider,
  ListItem,
  ListItemText,
  Hidden
} from "@material-ui/core";
import uuid from "react-uuid";
import Producto from "./Producto";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  encabezadoMenu: {
    backgroundColor: "#1976D2",
    padding: theme.spacing(1.5),
    color: "#D1D1D1"
  },
  menuContenido: {
    color: "#000",
    paddingLeft: theme.spacing(8),
    padding: theme.spacing(2)
  },
  encabezadoListaProductos: {
    color: "#000",
    paddingLeft: theme.spacing(5),
    padding: theme.spacing(2)
  }
}));

const ListaProductos = ({ idcategoriaselecionada, mostrarEncabezado, handleOpen, setProductoSelecionado }) => {
  const classes = useStyles();
  const productosFiltradosxId = [
    {
      img:
        "data:image/png;base64,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",
      id: "1",
      nombre: "Seco 1",
      precio: "10",
      descripcion: "Seco de pollo con menestra",
      aplica_iva: "si",
      categoria: "Bebidas"
    },
    {
      img:
        "http://avatars.design/wp-content/uploads/2016/09/avatar_collection_grid-3.jpg",
      id: "2",
      nombre: "Seco 2",
      precio: "2",
      descripcion: "Arroz con camarones y maduros fritos",
      aplica_iva: "si",
      categoria: "Bebidas"
    },
    {
      img:
        "http://avatars.design/wp-content/uploads/2016/09/avatar_collection_grid-3.jpg",
      id: "3",
      nombre: "Postre de babaco",
      precio: "5",
      descripcion: "Babaco en dulce",
      aplica_iva: "si",
      categoria: "Bebidas"
    },
    {
      img:
        "data:image/png;base64,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",
      id: "4",
      nombre: "Gaseosa",
      precio: "1",
      descripcion: "Gaseosa de sabores",
      aplica_iva: "si",
      categoria: "Bebidas"
    },
    {
      img:
        "data:image/png;base64,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",
      id: "5",
      nombre: "Ya tu sa ",
      precio: "8",
      descripcion: "Plato especial con aji",
      aplica_iva: "si",
      categoria: "Bebidas"
    },
   
    
  ];
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="encabezado-productos"
          color="primary"
          className={classes.encabezadoMenu}
        >
          <Typography variant="h4">
            <Box fontWeight="fontWeightBold" m={1}>
              Elija uno o varios productos
            </Box>
          </Typography>
          <Divider />
        </ListSubheader>
      }
      className={classes.root}
    >
      {mostrarEncabezado ? (
        <div>
          <ListItem className={classes.encabezadoListaProductos}>
            <ListItemText
              primary={
                <Typography variant="h5">
                  {" "}
                  {idcategoriaselecionada.nombre}{" "}
                </Typography>
              }
            />
          </ListItem>
          <Divider />{" "}
        </div>
      ) : null}

      {/* aqui van los productos */}
      { productosFiltradosxId ? ( productosFiltradosxId.map(producto => (
        <ListItem key={uuid()}>
          <ListItemText primary={<Producto producto={producto} setProductoSelecionado={setProductoSelecionado} handleOpen={handleOpen} tipo='add'/>} />
        </ListItem>
      ))) : (null) }
    </List>
  );
};

export default ListaProductos;
