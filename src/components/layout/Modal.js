import React from "react";
import {
  withStyles,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

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

const Modal = ({ open, handleClose, titulo, contenido, aciones }) => {
  return (
    <Dialog
      maxWidth="xs"
      open={open}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-titlePedido"
    >
      <DialogTitle onClose={handleClose}>
        {titulo}
      </DialogTitle>
      <DialogContent dividers={true}>{contenido}</DialogContent>
      <DialogActions> {aciones} </DialogActions>
    </Dialog>
  );
};

export default Modal;
