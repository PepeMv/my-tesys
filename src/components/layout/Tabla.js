import React from "react";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  eliminarCategoriaAction,
  obtenerCategoriaEditarAction,
} from "./../../actions/categoriasActions";
import {
  eliminarProductoAction,
  obtenerProductoEditarAction,
  editarProductoAction,
} from "./../../actions/productosActions";
import {
  eliminarMesaAction,
  obtenerMesaEditarAction,
} from "./../../actions/mesasActions";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0.3),
      margin: theme.spacing(0.3),
    },
  },
}));

function Tabla({ titulo, columnas, datos, activable, ancho }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const funcionEliminar = (id, nombre) => {
    if (titulo === "categorias") {
      Swal.fire({
        title: "Desea eliminar permanentemente?",
        text: `Se eliminara ${nombre}!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
      }).then((result) => {
        if (result.value) {
          dispatch(eliminarCategoriaAction(id));
          //console.log('acepte');
        }
      });
    } else if (titulo === "productos") {
      Swal.fire({
        title: "Desea eliminar permanentemente?",
        text: `Se eliminara ${nombre}!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
      }).then((result) => {
        if (result.value) {
          dispatch(eliminarProductoAction(id));
          //console.log('acepte');
        }
      });
    } else if (titulo === "mesas") {
      Swal.fire({
        title: "Desea eliminar permanentemente?",
        text: `Se eliminara ${nombre}!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
      }).then((result) => {
        if (result.value) {
          dispatch(eliminarMesaAction(id));
          //console.log('acepte');
        }
      });
    }
  };

  const abriroCerrar = (valor) => {
    if (valor === 1 || valor === "1") {
      return 0;
    } else {
      return 1;
    }
  };

  const funcionEditar = (dataRow) => {
    if (titulo === "categorias") {
      dispatch(obtenerCategoriaEditarAction(dataRow));
    } else if (titulo === "productos") {
      dispatch(obtenerProductoEditarAction(dataRow));
    } else if (titulo === "mesas") {
      dispatch(obtenerMesaEditarAction(dataRow));
    }
    history.push(`/${titulo}/edit/${dataRow.id}`);
  };

  let w = "";
  if (useMediaQuery((theme) => theme.breakpoints.down("sm"))) {
    w = "95%";
  } else {
    w = ancho;
  }

  return (
    <div className={classes.paper}>
      <MaterialTable
        title={null}
        columns={columnas}
        data={datos}
        style={{ width: `${w}`, margin: "auto" }}
        localization={{
          pagination: {
            firstAriaLabel: "Filas",
            labelRowsSelect: "Filas",
            firstTooltip: "Primera Página",
            previousAriaLabel: "Página Anterior",
            previousTooltip: "Página Anterior",
            nextAriaLabel: "Página Siguiente",
            nextTooltip: "Página Siguiente",
            lastAriaLabel: "Ultima Página",
            lastTooltip: "Ultima Página",
          },
          toolbar: {
            searchTooltip: "Buscar ",
            searchPlaceholder: "Buscar",
            exportTitle: "Exportar Datos",
            exportAriaLabel: "Exportar Datos",
            exportName: "Exportar como CVS",
          },
          body: {
            emptyDataSourceMessage: "No hay datos",
          },
          header: {
            actions: "Acciones",
          },
        }}
        actions={[
          (rowData) => ({
            icon: () => (
              <Switch
                checked={parseInt(rowData.activo) === 1 ? true : false}
                /* onChange={() => () } */
                color="primary"
                name="checkedB"
                size="small"
              />
            ),
            tooltip: "Activar o Desactivar producto",
            onClick: () =>
              dispatch(
                editarProductoAction({
                  id: rowData.id,
                  nombre: rowData.nombre,
                  precio: rowData.precio,
                  idCategoria: rowData.idCategoria,
                  aplicaiva: rowData.aplicaiva,
                  descripcion: rowData.descripcion,
                  activo: abriroCerrar(rowData.activo),
                })
              ),
            hidden: !activable,
          }),
          (rowData) => ({
            icon: () => <Edit fontSize="large" />,
            tooltip: "Editar",
            onClick: () => funcionEditar(rowData),
          }),
          (rowData) => ({
            icon: () => <DeleteOutline fontSize="large" />,
            tooltip: "Eliminar",
            onClick: (event, rowData) =>
              funcionEliminar(rowData.id, rowData.nombre),
          }),
          {
            icon: () => <AddIcon fontSize="large" color="primary" />,
            tooltip: "Agregar nuevo",
            isFreeAction: true,
            onClick: () => history.push(`/${titulo}/nuevo`),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          rowStyle: {
            backgroundColor: "#EEE",
          },
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
            fontSize: "1.5rem",
          },
          cellStyle: {
            fontSize: "1.2rem",
          },
          searchFieldStyle: {
            fontSize: "1.2rem",
          },
          filtering: true,
          exportButton: true,
          sorting: true,
          pageSizeOptions: [10, 20, 30],
          pageSize: 10,
        }}
        icons={{}}
      />
    </div>
  );
}

export default Tabla;
