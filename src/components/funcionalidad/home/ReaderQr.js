import React, { useState } from "react";
import QrReader from "react-qr-reader";
import { useRef } from "react";
import { Button, Typography, makeStyles, Grid } from "@material-ui/core";
import {useSelector} from 'react-redux';

const useStyles = makeStyles(theme => ({  
  divContenedor: {
    minWidth: "230px",    
    marigin:'auto',
    padding:'auto',
  }
}));

const ReaderQr = ({setMesaEscaneada, setTipoPedido, setUbicacionHome}) => {
  const classes = useStyles();
  const [resultado, setResultado] = useState("No se registro QR!");
  const componentRef = useRef(null);
  const mesas = useSelector( (state) => state.mesas.listadoMesas );
  const handleScan = data => {
    if (data) {
      const mesaEscaneada = mesas.find( mesa => mesa.qr === data);
      setMesaEscaneada(mesaEscaneada);
      setResultado(mesaEscaneada.nombre);
      setTipoPedido("MESA");
      setUbicacionHome({
        nombre: "Domicilio: Tu ubicación",
        lat: "",
        long: ""
      });
    }
  };
  const handleError = err => {
    console.error(err);
  };

  return (
    <Grid container spacing={1} className={classes.divContenedor} >
      <Grid item xs={12}>
        <QrReader
          ref={componentRef}
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
          showViewFinder={false}
          /* className={classes.paper} */
        />
        <Button variant="outlined" color="secondary" fullWidth className="p-2">
          <Typography variant="h6">{resultado} </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default ReaderQr;
