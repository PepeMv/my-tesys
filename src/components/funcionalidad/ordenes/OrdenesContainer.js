import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerTodosLosPedidosAction } from "../../../actions/pedidosActions";
import AppFrame from "../../layout/AppFrame";
import Spinner from "../../layout/Spinner";
import {
  Grid,
  Button,
} from "@material-ui/core";
import Tabla from "../../layout/Tabla";
import Modal from "./../../layout/Modal";

import Factura from "./Factura";



const OrdenesContainer = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.pedidos.loading);
  const pedidos = useSelector((state) => state.pedidos.pedidosGenerales);
  const detalles = useSelector((state) => state.pedidos.detallesGenerales);
  
  const [detalleTemporal, setDetalleTemporal] = useState([]);
  const [pedidoTemporal, setPedidoTemporal] = useState({});
  const [opendetalle, setOpenDetalle] = useState(false);

  const handleOpen = () => {
    setOpenDetalle(true);
  };
  const handleClose = () => {
    setOpenDetalle(false);
    setPedidoTemporal({});
    setDetalleTemporal([]);
  };
  useEffect(() => {
    const cargarPedidos = () => dispatch(obtenerTodosLosPedidosAction());
    cargarPedidos();
    //eslint-disable-next-line
  }, []);

  const columns = [
    { title: "Nº", field: "numeroPedido" },
    { title: "Fecha", field: "fechahoraPedido", type: "datetime" },
    {
      title: "Estado",
      field: "estado",
      lookup: {
        pedido: "Pedido",
        preparado: "Preparado",
        entregado: "Entregado",
        cancelado: "Cancelado"
      },
    },
    { title: "Cliente", field: "nombreCliente" },
    { title: "Nº doc.", field: "numeroDocumento" },
    {
      title: "Tipo",
      field: "tipoPedido",
      lookup: { MESA: "Mesa", DOMICILIO: "Domicilio" },
    },
    { title: "Total $", field: "totalPedido" },
    {
      render: (rowData) => (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            setDetalleTemporal(
              detalles.filter((item) => item.idPedido === rowData.id)
            );
            setPedidoTemporal(rowData);
            handleOpen();
          }}
        >
          Detalle
        </Button>
      ),
      filtering: false,
      sorting: false,
    },
  ];

  const renderContenido = () => (
   <Factura detalleTemporal={detalleTemporal} pedidoTemporal={pedidoTemporal} />
  );

  const renderBody = () => (
    <Fragment>
      <Spinner active={loading} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Tabla
            titulo="pedidos"
            columnas={columns}
            datos={pedidos}
            activable={false}
            ancho="95%"
          />
        </Grid>
      </Grid>
      <Modal
        handleClose={handleClose}
        open={opendetalle}
        titulo="Detalle"
        contenido={renderContenido()}
      />
    </Fragment>
  );

  return <AppFrame titulo="Buscar Pedidos" body={renderBody()} />;
};

export default OrdenesContainer;
