import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import uuid from "react-uuid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import RoomServiceSharpIcon from '@material-ui/icons/RoomServiceSharp';

import moment from "moment";
import "moment/locale/es";
import { Box, Divider, Button } from "@material-ui/core";
import Modal from "./../../layout/Modal";
import Factura from "./Factura";
import { useDispatch } from "react-redux";
import { cambiarEstadoPedidoAPreparadoAction } from "../../../actions/pedidosActions";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  boton: {
    margin: theme.spacing(0.5),
  },
}));

const CardOrden = ({ pedido, detalle, editable }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  //console.log(detalle);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [opendetalle, setOpenDetalle] = useState(false);

  const handleOpen = () => {
    setOpenDetalle(true);
  };
  const handleClose = () => {
    setOpenDetalle(false);
  };

  const renderContenido = () => (
    <Factura pedidoTemporal={pedido} detalleTemporal={detalle} />
  );
  async function enviarPedidoPreparado () {
    await dispatch( cambiarEstadoPedidoAPreparadoAction(pedido.id) );
  };

  return (
    <Paper elevation={2} className={classes.root}>
      <Card>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {pedido.tipoPedido.charAt(0)}
            </Avatar>
          }
          title={
            <Typography variant="h5">
              <Box fontWeight="fontWeightBold">
                {pedido.nombreCliente} -
                {moment.utc(pedido.fechahoraPedido).format("MMM D YY, h:mm a")}
              </Box>
            </Typography>
          }
          subheader={
            <Typography variant="h5">
              <Box> {pedido.tipoPedido} </Box>
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="h5">
            <Box> Entregar a: {pedido.entregarPedido} </Box>
          </Typography>
          <Typography variant="h5">
            <Box> Numero pedido: {pedido.numeroPedido} </Box>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/*  {entregable ? (
            <IconButton onClick={() => enviarPedidoPreparado()}>
              <CheckCircleOutlineIcon color="primary" fontSize="large" />
            </IconButton>
          ) : null} */}
          {editable === "preparar" ? (
            <div>
              <IconButton onClick={() => enviarPedidoPreparado()}>
                <CheckCircleOutlineIcon color="primary" fontSize="large" />
              </IconButton>
              <IconButton>
                <DeleteIcon color="secondary" fontSize="large" />
              </IconButton>
            </div>
          ) : editable === "ver" ? (
            <div>
              <Button
                variant="contained"
                color="primary"
                className={classes.boton}
                onClick={() => handleOpen()}
              >
                <Typography> DETALLES </Typography>
              </Button>
              {pedido.estado === "pedido" ? (
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.boton}
                >
                  <Typography> {pedido.estado.toUpperCase()} </Typography>
                </Button>
              ) : pedido.estado === "preparado" ? (
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.boton}
                >
                  <Typography> {pedido.estado.toUpperCase()} </Typography>
                </Button>
              ) : pedido.estado === "entregado" ? (
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.boton}
                >
                  <Typography> {pedido.estado.toUpperCase()} </Typography>
                </Button>
              ) : null}
            </div>
          ) : (
            <IconButton >
              <RoomServiceSharpIcon color="primary" fontSize="large" />
            </IconButton>
          )}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="h5">
              <Divider />
              <Box fontWeight="fontWeightBold"> Detalle Pedido </Box>
              <Divider />
            </Typography>
            <Box m={2} width="100%">
              {detalle !== undefined
                ? detalle.map((item) => (
                    <Typography paragraph variant="h5" key={uuid()}>
                      {item.nombreProducto} X {item.cantidadProducto}
                    </Typography>
                  ))
                : null}
            </Box>
          </CardContent>
        </Collapse>
      </Card>
      <Modal
        handleClose={handleClose}
        open={opendetalle}
        titulo="Detalle"
        contenido={renderContenido()}
      />
    </Paper>
  );
};

export default CardOrden;
