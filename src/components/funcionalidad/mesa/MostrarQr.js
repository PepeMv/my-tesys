import React, { useState, useRef } from "react";


import QrcodeGenerator from "../../layout/QrcodeGenerator";
import {
  Typography,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  withStyles,
  IconButton
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import ReactToPrint from "react-to-print";

const MostrarQr = ({ handleClose, open, qr }) => {
  // Configuración del modal de material-ui  
  const [size, setSize] = useState("");
  const actualizarSize = e => {
    setSize(e.target.value);
  };
 
  const styles = theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  });

  const DialogTitle = withStyles(styles)(props => {
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

  const componentRef = useRef(null);
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle onClose={handleClose}>{qr.nombre} </DialogTitle>
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
