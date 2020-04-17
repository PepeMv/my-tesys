import React, { Fragment, useState } from "react";
import AppFrame from "../../layout/AppFrame";
import { Grid, Button } from "@material-ui/core";
import Tabla from "../../layout/Tabla";
import MostrarQr from "./MostrarQr";
import { useSelector } from "react-redux";
import Spinner from "../../layout/Spinner";

const MesasContainer = () => {
  const loading = useSelector((state) => state.mesas.loading);
  const data = useSelector((state) => state.mesas.listadoMesas);
  const [open, setOpen] = useState(false);
  const [qrseleccionado, setQrSelecionado] = useState({
    nombre: "",
    qr: ""
  });
  const actualizarQrSelecionado = (nombre, qr) => {
    setQrSelecionado({
      nombre,
      qr
    });
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    /* { title: "qr", field: "qr" }, */
    /* { title: "id", field: "id" }, */
    { title: "Nombre", field: "nombre" },
    { title: "Descripcion", field: "descripcion" },
    {
      title: "Mostrar QR",
      field: "qr",
      render: rowData => (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            actualizarQrSelecionado(rowData.nombre, rowData.qr);
            handleOpen();
          }}
        >
          Mostrar QR
        </Button>
      ),
      filtering: false,
      sorting: false
    }
  ];

  const renderBody = () => (
    <Fragment>
      <Spinner active={loading} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Tabla
            titulo="mesas"
            columnas={columns}
            datos={data}
            activable={false}
            ancho="60%"
          />
        </Grid>
      </Grid>
      <MostrarQr open={open} handleClose={handleClose} qr={qrseleccionado} />
    </Fragment>
  );

  return <AppFrame titulo="Listado de Mesas" body={renderBody()} />;
};

export default MesasContainer;
