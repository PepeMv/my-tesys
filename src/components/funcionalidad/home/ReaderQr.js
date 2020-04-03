import React, { useState } from "react";
import QrReader from "react-qr-reader";
import { useRef } from "react";
import { Button, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(2) ,    
      textAlign:'center',
      color: theme.palette.text.secondary,
      width:'100%'
    },  
    
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
    <div>
      <QrReader
        ref={componentRef}
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
        showViewFinder={false}
        
      />
      <Button variant="outlined" color="secondary" fullWidth className="p-4">
         <Typography variant="h5">{resultado} </Typography> 
        </Button>
    </div>
  );
};

export default ReaderQr;
