import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
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
  useMediaQuery
} from "@material-ui/core";
import KeyboardArrowRightSharpIcon from "@material-ui/icons/KeyboardArrowRightSharp";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListaProductos from "./ListaProductos";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  encabezadoMenu: {
    backgroundColor: "#ff5722",
    padding: theme.spacing(1.5),
    color: "#D1D1D1"
  },
  menuContenido: {
    color: "#000",
    paddingLeft: theme.spacing(5),
    padding: theme.spacing(2)
  }
}));

const ListaMenu = ({ setIdCategoriaSeleccionada,  handleOpen,  setProductoSelecionado }) => {
  const classes = useStyles();
  const [categoriaSelecionada, setCategoriaSeleccionada] = useState({
    id: "",
    nombre: ""
  });

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    setIdCategoriaSeleccionada({
      id: cate[0].id,
      nombre: cate[0].nombre
    });
    setCategoriaSeleccionada({
      id: cate[0].id,
      nombre: cate[0].nombre
    });   
    
  }, []);


  const [settings, setSettings ]= useState([
   /*  { id: "1", abierto: false },
    { id: "3", abierto: false },
    { id: "4", abierto: false },
    { id: "5", abierto: false },
    { id: "2", abierto: false }, */
  ]);
  const [cate, setCate] = useState([
    { id: "1", nombre: "Bebidas" },
    { id: "2", nombre: "Almuerzos" },
    { id: "3", nombre: "Promociones" },
    { id: "4", nombre: "Mariscos" },
    { id: "5", nombre: "Especiales" }
  ]);

  const cambiarIdCategoriaSelecionada = (id, nombre) => {
    setIdCategoriaSeleccionada({
      id,
      nombre
    });
    setCategoriaSeleccionada({
      id,
      nombre
    });
    if (mdSize) {
      handleClick(id);
    }
  };

  const addSettings = (idCategoria) =>{
    setSettings([
      ...settings, 
      {id: idCategoria, abierto:false}
    ]);
  }
  const handleClick = (id) => {
    setSettings(settings.map(item => item.id === id ? {...item, abierto: !item.abierto } : {...item, abierto: false} ));
    //console.log(arrayConf);
    //console.log((configuracionesOpen.find(item => item.id === id )).abierto);    
  };

  const getOpenValue=(id)=>((settings.find(item => item.id === id )).abierto);

  let mdSize = null;
  if (useMediaQuery(theme => theme.breakpoints.down("md"))) {
    mdSize = true;
  } else {
    mdSize = false;
  }

  let indicador = null;

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
              Menú
            </Box>
          </Typography>
          <Divider />
        </ListSubheader>
      }
      className={classes.root}
    >
      {cate.map(categoria => (
        <div key={uuid()}>
           {
              settings.find(item => item.id === categoria.id) === undefined ? ( addSettings(categoria.id), indicador=false  ):( indicador=getOpenValue(categoria.id))
            } 
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
                  <Box fontWeight="fontWeightBold">                    
                    {categoria.nombre}
                  </Box>
                </Typography>
              }
            />
            <Hidden smDown>
              <KeyboardArrowRightSharpIcon fontSize="large" />
            </Hidden>
            
            <Hidden mdUp>
             
              {indicador ? 
              (
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
              <Collapse in={getOpenValue(categoria.id)} timeout="auto" unmountOnExit>                
                  <ListaProductos idcategoriaselecionada={categoriaSelecionada} mostrarEncabezado={false} handleOpen={handleOpen} setProductoSelecionado={setProductoSelecionado}/>                 
              </Collapse>
            ) : null
          ) : null}
          </Hidden>
          
        </div>
      ))}
    </List>
  );
};

export default ListaMenu;
