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
} from "@material-ui/core";
import uuid from "react-uuid";
import Producto from "./Producto";
import { useSelector } from "react-redux";
import { Skeleton, Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  encabezadoMenu: {
    backgroundColor: "#1976D2",
    padding: theme.spacing(1.5),
    color: "#D1D1D1",
  },
  menuContenido: {
    color: "#000",
    paddingLeft: theme.spacing(8),
    padding: theme.spacing(2),
  },
  encabezadoListaProductos: {
    color: "#000",
    paddingLeft: theme.spacing(5),
    padding: theme.spacing(2),
  },
}));

const ListaProductos = ({
  idcategoriaselecionada,
  mostrarEncabezado,
  handleOpen,
  setProductoSelecionado,
}) => {
  const loading = useSelector((state) => state.productos.loading);
  const classes = useStyles();
  const categoriaDefault = useSelector(
    (state) => state.categorias.listadoCategorias[0]
  );

  const productosFiltradosxId = useSelector((state) =>
    state.productos.listadoProductos.filter(
      (producto) =>
        producto.idCategoria ===
          (idcategoriaselecionada.id !== ""
            ? idcategoriaselecionada.id
            // eslint-disable-next-line
            : categoriaDefault.id) && (parseInt(producto.activo) === 1 )
    )
  );

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
                  {idcategoriaselecionada.nombre}
                </Typography>
              }
            />
          </ListItem>
          <Divider />
        </div>
      ) : null}

      {/* aqui van los productos */}
      {loading ? (
        <div>
          <Box m={1}>
            <Skeleton
              variant="text"
              aniimation="weave"
              width="100%"
              height="100px"
            />
          </Box>
          <Box m={1}>
            <Skeleton
              variant="text"
              aniimation="weave"
              width="100%"
              height="100px"
            />
          </Box>
          <Box m={1}>
            <Skeleton
              variant="text"
              aniimation="weave"
              width="100%"
              height="100px"
            />
          </Box>
          <Box m={1}>
            <Skeleton
              variant="text"
              aniimation="weave"
              width="100%"
              height="100px"
            />
          </Box>
          <Box m={1}>
            <Skeleton
              variant="text"
              aniimation="weave"
              width="100%"
              height="100px"
            />
          </Box>
          <Box m={1}>
            <Skeleton
              variant="text"
              aniimation="weave"
              width="100%"
              height="100px"
            />
          </Box>
          <Box m={1}>
            <Skeleton
              variant="text"
              aniimation="weave"
              width="100%"
              height="100px"
            />
          </Box>
          <Box m={1}>
            <Skeleton
              variant="text"
              aniimation="weave"
              width="100%"
              height="100px"
            />
          </Box>
        </div>
      ) : productosFiltradosxId.length !== 0 ? (
        productosFiltradosxId.map((producto) => (
          <ListItem key={uuid()}>
            <ListItemText
              primary={
                <Producto
                  producto={producto}
                  setProductoSelecionado={setProductoSelecionado}
                  handleOpen={handleOpen}
                  tipo="add"
                />
              }
            />
          </ListItem>
        ))
      ) : (<Box m={2}>
        <Alert severity="warning">
          <Typography variant="h6">No hay productos activos!</Typography>
        </Alert>
      </Box>)}
    </List>
  );
};

export default ListaProductos;
