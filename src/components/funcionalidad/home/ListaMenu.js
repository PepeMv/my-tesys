import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import {  useSelector } from "react-redux";
import {
  List,
  ListSubheader,
  makeStyles,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Divider,
  Hidden,
  Collapse,
  useMediaQuery,
} from "@material-ui/core";
import KeyboardArrowRightSharpIcon from "@material-ui/icons/KeyboardArrowRightSharp";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListaProductos from "./ListaProductos";
//import { obtenerCategoriasAction } from "../../../actions/categoriasActions";
import { Alert, Skeleton } from "@material-ui/lab";

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
    paddingLeft: theme.spacing(5),
    padding: theme.spacing(2),
  },
}));

const ListaMenu = ({
  setIdCategoriaSeleccionada,
  handleOpen,
  setProductoSelecionado,
}) => {
  const loading = useSelector((state) => state.categorias.loading);
  const cate = useSelector((state) =>
    state.categorias.listadoCategorias.filter(
      (categoria) => categoria.activo !== 0
    )
  );

  const classes = useStyles();
  const [categoriaSelecionada, setCategoriaSeleccionada] = useState({
    id: "",
    nombre: "",
  });

  useEffect(() => {}, []);

  const [settings, setSettings] = useState([]);

  const cambiarIdCategoriaSelecionada = (id, nombre) => {
    setIdCategoriaSeleccionada({
      id,
      nombre,
    });
    setCategoriaSeleccionada({
      id,
      nombre,
    });
    if (mdSize) {
      handleClick(id);
    }
  };

  const addSettings = (idCategoria) => {
    setSettings([...settings, { id: idCategoria, abierto: false }]);
  };
  const handleClick = (id) => {
    setSettings(
      settings.map((item) =>
        item.id === id
          ? { ...item, abierto: !item.abierto }
          : { ...item, abierto: false }
      )
    );
    //console.log(arrayConf);
    //console.log((configuracionesOpen.find(item => item.id === id )).abierto);
  };

  const getOpenValue = (id) => settings.find((item) => item.id === id).abierto;

  let mdSize = null;
  if (useMediaQuery((theme) => theme.breakpoints.down("md"))) {
    mdSize = true;
  } else {
    mdSize = false;
  }

  let indicador = null;

  return (
    <List
    color="primary"
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="encabezado-menu"
          className={classes.encabezadoMenu}
        >
          <Typography variant="h4">
            <Box fontWeight="fontWeightBold" m={1}>
              Menú
            </Box>
          </Typography>
          <Divider />
        </ListSubheader>
      }
      className={classes.root}
    >
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
        </div>
      ) : cate.length !== 0 ? (
        cate.map((categoria) => (
          <div key={uuid()}>
            {settings.find((item) => item.id === categoria.id) === undefined
              ? (addSettings(categoria.id), (indicador = false))
              : (indicador = getOpenValue(categoria.id))}
            <Divider />
            <ListItem
              button
              className={classes.menuContenido}
              onClick={() => {
                cambiarIdCategoriaSelecionada(categoria.id, categoria.nombre);
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="h5">
                    <Box fontWeight="fontWeightBold">{categoria.nombre}</Box>
                  </Typography>
                }
              />
              <Hidden smDown>
                <KeyboardArrowRightSharpIcon fontSize="large" />
              </Hidden>

              <Hidden mdUp>
                {indicador ? (
                  <ExpandLess fontSize="large" />
                ) : (
                  <ExpandMore fontSize="large" />
                )}
              </Hidden>
            </ListItem>
            <Divider />
            <Hidden mdUp>
              {mdSize ? (
                categoria.id === categoriaSelecionada.id ? (
                  <Collapse
                    in={getOpenValue(categoria.id)}
                    timeout="auto"
                    unmountOnExit
                  >
                    <ListaProductos
                      idcategoriaselecionada={categoriaSelecionada}
                      mostrarEncabezado={false}
                      handleOpen={handleOpen}
                      setProductoSelecionado={setProductoSelecionado}
                    />
                  </Collapse>
                ) : null
              ) : null}
            </Hidden>
          </div>
        ))
      ) : (
        <Box m={2}>
          <Alert severity="warning">
            <Typography variant="h6">No hay categorias activas!</Typography>
          </Alert>
        </Box>
      )}
    </List>
  );
};

export default ListaMenu;
