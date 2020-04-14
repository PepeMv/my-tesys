import React, { useState } from "react";
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

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const useStyles = makeStyles((theme) => ({
  contenedor: {
    /* width:'500px' */
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
  divmapa: {
    height: "400px",
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

const MostrarLocationPickerLeaft = ({
  abrirlocation,
  handleCerrarLocation,
}) => {
  const position = [51.505, -0.09];

  /* const [ubicacion, setUbicacion] = useState({
    direccion: "Ambato",
    posicion: {
      lat: 0,
      lng: 0,
    },
  });

  const handleLocationChange = ({ position, address, places }) => {
    setUbicacion({
      direccion: address,
      posicion: position,
    });
  };
 */
  const classes = useStyles();
  return (
    <Dialog
      maxWidth="xs"
      open={abrirlocation}
      scroll={"paper"}
      className={classes.contenedor}
    >
      <DialogTitle onClose={handleCerrarLocation}>
        <Box fontWeight="fontWeightBold" m={0}>
          Elije tu ubicación!
        </Box>
      </DialogTitle>
      <DialogContent dividers={true}>
        <div id="mapid">
          hol
          <Map center={position} zoom={13}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
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

export default MostrarLocationPickerLeaft;
