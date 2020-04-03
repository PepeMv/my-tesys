import React from 'react';
import { withStyles, Typography, IconButton, Dialog, DialogActions, Box, DialogContent, makeStyles } from '@material-ui/core';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import ReaderQr from './ReaderQr';

const useStyles = makeStyles(theme => ({
    contenedor: {
      /* width:'500px' */
    },
}));

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

const MostrarQrReader = ({abrirqr, handleCerrarQr}) => {
    const classes = useStyles();
    return (
        <Dialog
        maxWidth="xs"
        open={abrirqr}
        scroll={"paper"}
        className={classes.contenedor}        
      >
        <DialogTitle          
          onClose={handleCerrarQr}
        >
          <Box fontWeight="fontWeightBold" m={0}>
            Escanea un QR!
          </Box>
        </DialogTitle>
        <DialogContent dividers={true}>
            <ReaderQr />
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    );
};

export default MostrarQrReader;