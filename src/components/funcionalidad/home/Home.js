import React, { useState, useEffect } from "react";
import AppFrame from "../../layout/AppFrame";
import uuid from "react-uuid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  makeStyles,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  GridList,
  GridListTile,
  Hidden
} from "@material-ui/core";
import CropFreeTwoToneIcon from "@material-ui/icons/CropFreeTwoTone";
import LocationOnTwoToneIcon from "@material-ui/icons/LocationOnTwoTone";
import imgEncabezado from "./../../../img/EncabezadoBackground.jpg";
import imagenesBackgroun from "./../../../img/imagesBackgroun.jpg";
import ListaMenu from "./ListaMenu";
import ListaProductos from "./ListaProductos";
import ListaPedido from "./ListaPedido";
import MostrarProducto from "./MostrarProducto";
import MostrarQrReader from "./MostrarQrReader";
import {obtenerRestauranteAction} from './../../../actions/restauranteActions';
import {obtenerCategoriasAction} from './../../../actions/categoriasActions';
import {obtenerProductosAction} from './../../../actions/productosActions';
import {obtenerMesasAction} from './../../../actions/mesasActions';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from "@material-ui/lab";
import MostrarLocationPicker from "./MostrarLocationPicker";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0.3),
      margin: theme.spacing(0.3)
    }
  },
  encabezado: {
    width: "100%",
    height: "400px",
    backgroundImage: `url(${imgEncabezado})`,
    backgroundRepeat: "no",
    backgroundSize: "cover",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  tituloEncabezado: {
    textAlign: "left",
    marginLeft: theme.spacing(20),
    color: "#D1D1D1",
    [theme.breakpoints.down("sm")]: {
      margin: "auto"
    }
  },
  botonQR: {
    marginLeft: theme.spacing(25),
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1)
    }
  },
  botonUbiation: {
    marginRight: theme.spacing(25),
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1)
    }
  },
  imagenesPostEncabezado: {
    width: "100%",
    height: "200px",
    backgroundImage: `url(${imagenesBackgroun})`,
    backgroundRepeat: "no",
    backgroundSize: "cover",
    flexWrap: "wrap",
    margin: "auto",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    overflow: "hidden"
  },
  gridList: {
    width: "90%",
    height: "80%"
  },
  imagenes:{
    objectFit: 'fill',
    margin: "auto",
    padding:theme.spacing(2),
  }
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(()=>{
    //consultar la api 
    const cargarRestaurante = () => dispatch( obtenerRestauranteAction() );
    const cargarCategorias = () => dispatch( obtenerCategoriasAction() );
    const cargarProductos = () => dispatch( obtenerProductosAction() );
    const cargarMesas = () => dispatch( obtenerMesasAction() );

    cargarRestaurante();
    cargarCategorias();
    cargarProductos();
    cargarMesas();
  },[]);

  //obtener logo  el restaurante
  const {img1, img2, img3, img4} = useSelector((state) => state.restaurante.imagenes);  
 
  
  //estate para habilia¡tar el boton de locationPicker
  const [domicilio, setDomicilio] = useState(true);
  //state para definir tipo de pedido MESA O DOMICILIO
  const [tipopedido, setTipoPedido]= useState("");
  //state de mesa
  const [mesaescaneada, setMesaEscaneada] = useState({
    nombre: "Leer QR de una mesa!"
  });
  //statede Ubicacion
  const [ubicacion, setUbicacionHome] = useState({
    nombre: "Domicilio: Tu ubicación",
    lat: "",
    long: ""
  });
  
  const [idcategoriaselecionada, setIdCategoriaSeleccionada] = useState({
    id: "",
    nombre: ""
  });
  const [listapedidos, setListaPedidos] = useState([]);
  //abrir producto
  const [open, setOpen] = useState(false);
  //abrir qr
  const [abrirqr, setAbrirQr] = useState(false);
  //abrir lication
  const[abrirlocation, setAbrirLocation] = useState(false);

  const [tipomostrarproducto, setTipoMostrarProducto] = useState();
  const [productoseleccionado, setProductoSelecionado] = useState({
    cantidad: "",
    preciototal: "",
    producto: {
      aplicaiva: "",
      idCategoria: "",
      descripcion: "",
      id: "",
      imagen: "",
      nombre: "",
      precio: ""
    }
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hanldeAbrirQr = () =>{
    setAbrirQr(true);
  }

  const handleCerrarQr = () =>{
    setAbrirQr(false);
  }

  const handleOpenLocation = () =>{
    setAbrirLocation(true);
  }

  const handleCerrarLocation = () =>{
    setAbrirLocation(false);
  }

  let wImagenes = "";
  if (useMediaQuery(theme => theme.breakpoints.down("sm"))) {
    wImagenes = 4;
  } else {
    wImagenes = 2;
  }
  const tileData = [
    {
      img:img1,
    },
    {
      img:img2,
    },
    {
      img:img3,
    },
    {
      img:img4,
    }
  ];

  const renderBody = () => (
    <div className={classes.paper}>
      <Paper>      
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Paper className={classes.encabezado}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <div className={classes.tituloEncabezado}>
                  <Typography variant="h2">
                    <Box fontWeight="fontWeightBold" m={4}>
                      Haz tu pedido YA!
                    </Box>
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.botonQR}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<CropFreeTwoToneIcon />}
                    onClick={()=>hanldeAbrirQr()}
                  >
                    <Typography variant="h5">
                      <Box fontWeight="fontWeightBold" m={1}>
                        {mesaescaneada.nombre}
                      </Box>
                    </Typography>
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                {domicilio ? (
                  <div className={classes.botonUbiation}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<LocationOnTwoToneIcon />}
                      onClick={()=>handleOpenLocation()}
                    >
                      <Typography variant="h5">
                        <Box fontWeight="fontWeightBold" m={1}>
                          {ubicacion.nombre}
                        </Box>
                      </Typography>
                    </Button>
                  </div>
                ) : null}
              </Grid>
            </Grid>
          </Paper>
        </Grid>       
        <Grid item xs={12} md={4} lg={3}>
          <Paper>
            <ListaMenu
              setIdCategoriaSeleccionada={setIdCategoriaSeleccionada}
              handleOpen={handleOpen}
              setProductoSelecionado={setProductoSelecionado}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <Paper>
            <Hidden smDown>
              <ListaProductos
                idcategoriaselecionada={idcategoriaselecionada}
                mostrarEncabezado={true}
                handleOpen={handleOpen}
                setProductoSelecionado={setProductoSelecionado}
              />
            </Hidden>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={3}>
          <Paper>
            <ListaPedido
              listapedidos={listapedidos}
              setListaPedidos={setListaPedidos}
              setProductoSelecionado={setProductoSelecionado}
              handleOpen={handleOpen}
              setTipoMostrarProducto={setTipoMostrarProducto}
              tipopedido={tipopedido}
              productoEditable={true}
              lugar={ tipopedido ==="DOMICILIO" ? ubicacion : (tipopedido==="MESA" ? mesaescaneada: "" ) }
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.imagenesPostEncabezado}>
            <GridList cellHeight={160} className={classes.gridList} cols={4}>
              {img1? (tileData.map(tile => (
                <GridListTile key={uuid()} cols={wImagenes || 1}>
                  <img src={tile.img} alt={'Imagen de presentacion'} className={classes.imagenes} />
                </GridListTile>
              ))): ( ( <Skeleton variant="rect" aniimation='weave' width={200} height={100} />))}
            </GridList>
          </Paper>
        </Grid>
      </Grid>
      {
        open ? (<MostrarProducto
          producto={productoseleccionado.producto}
          cantidad={productoseleccionado.cantidad}
          preciototal={productoseleccionado.preciototal}
          setProductoSelecionado={setProductoSelecionado}
          open={open}
          handleClose={handleClose}
          listapedidos={listapedidos}
          setListaPedidos={setListaPedidos}
          tipomostrarproducto={tipomostrarproducto}
          setTipoMostrarProducto={setTipoMostrarProducto}
        />) : (null)
      }
      <MostrarQrReader abrirqr={abrirqr} handleCerrarQr={handleCerrarQr} setMesaEscaneada={setMesaEscaneada} setTipoPedido={setTipoPedido} setUbicacionHome={setUbicacionHome} />
      <MostrarLocationPicker abrirlocation={abrirlocation} handleCerrarLocation={handleCerrarLocation} setUbicacionHome={setUbicacionHome} setTipoPedido={setTipoPedido} setMesaEscaneada={setMesaEscaneada} />
      </Paper>
    </div>
  );

  return <AppFrame body={renderBody()} />;
};

export default Home;
