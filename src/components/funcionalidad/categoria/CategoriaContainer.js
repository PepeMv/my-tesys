import React, { Fragment } from "react";
import { Grid, Switch } from "@material-ui/core";
import Tabla from "../../layout/Tabla";
import AppFrame from "../../layout/AppFrame";

import { useDispatch, useSelector } from "react-redux";
//redux
import {
  editarCategoriaAction,
} from "./../../../actions/categoriasActions";
import Spinner from "../../layout/Spinner";

const renderBody = (data, columns, loading) => (
  <div>
    <Fragment>
      <Spinner active={loading} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Tabla
            titulo="categorias"
            columnas={columns}
            datos={data}
            activable={false}
            ancho="50%"
          />
        </Grid>
      </Grid>
    </Fragment>
  </div>
);

const CategoriaContainer = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.categorias.loading);
  const data = useSelector((state) => state.categorias.listadoCategorias);

  const abriroCerrar = (valor) => {
    if (valor === 1 || valor === "1") {
      return 0;
    } else {
      return 1;
    }
  };
  const columns = [
    { title: "Nombre", field: "nombre" },
    {
      title: "Activo",
      field: "activo",
      render: (rowData) => (
        <Switch
          checked={parseInt(rowData.activo) === 1 ? true : false}
          onChange={() =>
            dispatch(
              editarCategoriaAction({
                id: rowData.id,
                nombre: rowData.nombre,
                activo: abriroCerrar(rowData.activo),
              })
            )
          }
          color="primary"
          name="checkedB"
          size="small"
        />
      ),
      filtering: false,
      sorting: false,
    },
  ];

  return (
    <AppFrame
      titulo="Listado de Categorias"
      body={renderBody(data, columns, loading)}
    />
  );
};

export default CategoriaContainer;
