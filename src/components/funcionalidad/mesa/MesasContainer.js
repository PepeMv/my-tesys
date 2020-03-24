import React, { Fragment, useState } from "react";
import AppFrame from "../../layout/AppFrame";
import { Grid, Button } from "@material-ui/core";
import Tabla from "../../layout/Tabla";
import MostrarQr from "./MostrarQr";

const MesasContainer = () => {
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
    { title: "qr", field: "qr" },
    { title: "id", field: "id" },
    { title: "nombre", field: "nombre" },
    { title: "descripcion", field: "descripcion" },
    {
      title: "Avatar",
      field: "img",
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
      filtering: false
    }
  ];
  const data = [
    {
      id: "1",
      nombre: "Mesa 1",
      qr: "hola mundo",
      descripcion: "mesa primera"
    },
    {
      id: "2",
      nombre: "Mesa 2",
      qr: "hola mundo2",
      descripcion: "mesa segunda"
    },
    {
      id: "3",
      nombre: "Mesa 3",
      qr: "hola mundo3",
      descripcion: "mesa tercera"
    }
  ];

  const renderBody = () => (
    <Fragment>
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
