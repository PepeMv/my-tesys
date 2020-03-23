import React, { useState, useRef } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

import QrcodeGenerator from "../../layout/QrcodeGenerator";
import {
  Typography,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import ReactToPrint from "react-to-print";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: "auto",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
    height: "auto"
  }
}));

const MostrarQr = ({ handleClose, open, qr }) => {
  // Configuración del modal de material-ui
  const [modalStyle] = useState(getModalStyle);
  const [size, setSize] = useState("");
  const actualizarSize = e => {
    setSize(e.target.value);
  };
  const classes = useStyles();
  const componentRef = useRef(null);
  return (
    <Dialog
      open={open}
      onClose={() => !open}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">{qr.nombre} </DialogTitle>
      <DialogContent dividers={true} ref={componentRef}>
        <QrcodeGenerator
          valor={qr.qr}
          logo={`https://dummyimage.com/300x150/09f/&text=${qr.nombre}`}
          size={size ? size : null}
        />
      </DialogContent>
      <DialogActions>
        <TextField
          helperText="Tamaño default 250px"
          id="size"
          name="size"
          value={size}
          onChange={actualizarSize}
          label={<Typography variant="h4"> Tamaño </Typography>}
          style={{ width: "100%" }}
          fullWidth
          type='number'
          margin="normal"
          InputProps={{
            classes: {
              input: classes.resize
            }
          }}
          InputLabelProps={{
            shrink: true
          }}
        />
        <ReactToPrint
          trigger={() => (
            <Button variant="contained" color="primary" className="m4">
              <Typography> Imprimir </Typography>
            </Button>
          )}
          content={() => componentRef.current}
        />
        <Button onClick={handleClose} variant="outlined" color="primary">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MostrarQr;
