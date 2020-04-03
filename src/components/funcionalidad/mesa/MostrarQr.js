import React, { useState, useRef } from "react";


import QrcodeGenerator from "../../layout/QrcodeGenerator";
import {
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import ReactToPrint from "react-to-print";





const MostrarQr = ({ handleClose, open, qr }) => {
  // Configuración del modal de material-ui  
  const [size, setSize] = useState("");
  const actualizarSize = e => {
    setSize(e.target.value);
  };
 
  const componentRef = useRef(null);
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
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
