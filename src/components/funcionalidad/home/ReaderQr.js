import React, { useState } from "react";
import QrReader from "react-qr-reader";
import { useRef } from "react";
import { Button, Typography, makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({  
  divContenedor: {
    minWidth: "230px",    
    marigin:'auto',
    padding:'auto',
  }
}));

const ReaderQr = () => {
  const classes = useStyles();
  const [resultado, setResultado] = useState("No se registro QR!");
  const componentRef = useRef(null);

  const handleScan = data => {
    if (data) {
      setResultado(data);
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
