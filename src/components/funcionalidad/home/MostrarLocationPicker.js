import React, { useState, useRef } from "react";
import {
  withStyles,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  Box,
  DialogContent,
  makeStyles,
  Button,
} from "@material-ui/core";
import axios from 'axios';
import { Map, TileLayer, Marker, Popup, withLeaflet } from "react-leaflet";
import { SearchControl, OpenStreetMapProvider } from 'react-leaflet-geosearch';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import './react-leaflet-geosearch.css';

const useStyles = makeStyles((theme) => ({
  contenedor: {
    minHeight: "250px",
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
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

const MostrarLocationPicker = ({ abrirlocation, handleCerrarLocation, setUbicacionHome, setTipoPedido, setMesaEscaneada }) => {
  /* type Position = { lat: number, lng: number } */

  const mark = useRef(null);

  const [ubicacion, setUbicacion] = useState({
    direccion: "Ambato",
    centrar: {
      lat: -1.24908,
      lng: -78.61675,
    },
    posicion: {
      lat: -1.24908,
      lng: -78.61675,
    },
    zoom: 13,
    draggable: true,
  });

  const toggleDraggable = () => {
    setUbicacion({
      ...ubicacion,
      draggable: !ubicacion.draggable,
    });
  };

  async function obtenerLabel(lat, long){    
    //const respuesta = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=89c3b2384e954545b7a1ccc7d3bd2bc2&q=${lat}+${long}&pretty=1`);
    const respuesta = await axios.get(`https://us1.locationiq.com/v1/reverse.php?key=cd1c0627ef5e55&lat=${lat}&lon=${long}&format=json`);
    /* const nombre = respuesta.data.results[0].formatted; */
    const nombre = respuesta.data.display_name;
    return nombre;
  }
  async function updatePosition () {
    const marker = mark.current;
    if (marker != null) {      
      //console.log(marker.leafletElement.getLatLng());      
        const nombre = await obtenerLabel(marker.leafletElement.getLatLng().lat, marker.leafletElement.getLatLng().lng);
         try {
          setUbicacion({
            ...ubicacion,
            direccion: nombre,
            posicion: marker.leafletElement.getLatLng(),
          });
          setUbicacionHome({nombre: nombre, lat:marker.leafletElement.getLatLng().lat, long: marker.leafletElement.getLatLng().lng});
          setTipoPedido("DOMICILIO");
          setMesaEscaneada({
            nombre: "Leer QR de una mesa!"
          });
         } catch (error) {}
       
      
    }
  };

  const updateporBuscador = (resultados) =>{
    //console.log(resultados);    
    setUbicacion({
      ...ubicacion,
      posicion: {lat: resultados.y, lng:resultados.x},
      direccion: resultados.label,      
    });
    setUbicacionHome({nombre: resultados.label, lat:resultados.y, long: resultados.x});
    setTipoPedido("DOMICILIO");
    setMesaEscaneada({
      nombre: "Leer QR de una mesa!"
    });
  }
  const provider =  OpenStreetMapProvider();
  
  const GeoSearchControlElement = withLeaflet(SearchControl);
 
  const centrar = [ubicacion.centrar.lat, ubicacion.centrar.lng];
  const position = [ubicacion.posicion.lat, ubicacion.posicion.lng];

  const classes = useStyles();
  return (
    <Dialog maxWidth="xs" open={abrirlocation} scroll={"paper"} fullScreen>
      <DialogTitle onClose={handleCerrarLocation}>
        <Box fontWeight="fontWeightBold" m={0}>
          Elije tu ubicación!
        </Box>
      </DialogTitle>
      <DialogContent dividers={true} className={classes.contenedor}>
        <div id="mapid">
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            className="p-2"
          >
            <Typography variant="h6">{ubicacion.direccion} </Typography>
          </Button>
          <Map center={centrar} zoom={ubicacion.zoom}>            
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              draggable={ubicacion.draggable}
              onDragend={updatePosition}
              position={position}
              ref={mark}
            >
              <Popup minWidth={90}>
                {`${ubicacion.posicion.lat} + ${ubicacion.posicion.lng}`}
                <span onClick={() => toggleDraggable()}></span>
              </Popup>
            </Marker>
            <GeoSearchControlElement provider={provider} showMarker= {false} showPopup={false} popupFormat={({ query, result }) => ( updateporBuscador(result))} 
                  maxMarkers={1}  retainZoomLevel= {false}  animateZoom= {true} autoClose= {true}  
                  searchLabel={'Direccion: Ej, Ambato, Solano'} keepResult= {true} />
          </Map>
        </div>
      </DialogContent>
      <DialogActions>
        <Box m={1}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleCerrarLocation()}
          >
            <Typography variant="h6">Continuar</Typography>
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default MostrarLocationPicker;
