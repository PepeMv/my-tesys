import React, { useState } from "react";
import AppFrame from "../../layout/AppFrame";
import uuid from "react-uuid";
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
  }
}));

const Home = () => {
  const classes = useStyles();
  const [domicilio, setDomicilio] = useState(true);
  const [ubicacion, setUbicacion] = useState("Domicilio: Tu ubicación");
  const [mesaescaneada, setMesaEscaneada] = useState("Leer QR de una Mesa");
  const [idcategoriaselecionada, setIdCategoriaSeleccionada] = useState({
    id: "",
    nombre: ""
  });
  const [listapedidos, setListaPedidos] = useState([]);
  const [open, setOpen] = useState(false);
  const [abrirqr, setAbrirQr] = useState(false);

  const [tipomostrarproducto, setTipoMostrarProducto] = useState();
  const [productoseleccionado, setProductoSelecionado] = useState({
    cantidad: "",
    preciototal: "",
    producto: {
      aplica_iva: "",
      categoria: "",
      descripcion: "",
      id: "",
      img: "",
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
  const tileData = [
    {
      img:
        "https://images.unsplash.com/photo-1465310477141-6fb93167a273?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      title: "Image",
      author: "author",
      cols: 3
    },
    {
      img:
        "https://images.unsplash.com/photo-1465310477141-6fb93167a273?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      title: "Image",
      author: "author",
      cols: 1
    },
    {
      img:
        "https://images.unsplash.com/photo-1465310477141-6fb93167a273?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      title: "Image",
      author: "author",
      cols: 1
    },
    {
      img:
        "https://images.unsplash.com/photo-1465310477141-6fb93167a273?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      title: "Image",
      author: "author",
      cols: 3
    }
  ];

  const renderBody = () => (
    <div className={classes.paper}>
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
                        {mesaescaneada}
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
                    >
                      <Typography variant="h5">
                        <Box fontWeight="fontWeightBold" m={1}>
                          {ubicacion}
                        </Box>
                      </Typography>
                    </Button>
                  </div>
                ) : null}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.imagenesPostEncabezado}>
            <GridList cellHeight={160} className={classes.gridList} cols={4}>
              {tileData.map(tile => (
                <GridListTile key={uuid()} cols={tile.cols || 1}>
                  <img src={tile.img} alt={tile.title} className="p-2" />
                </GridListTile>
              ))}
            </GridList>
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
            />
          </Paper>
        </Grid>
      </Grid>
      <MostrarProducto
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
      />
      <MostrarQrReader abrirqr={abrirqr} handleCerrarQr={handleCerrarQr} />
    </div>
  );

  return <AppFrame body={renderBody()} />;
};

export default Home;
