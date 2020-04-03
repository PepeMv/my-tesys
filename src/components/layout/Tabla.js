import React, { useState } from "react";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import { makeStyles, Fab } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0.3),
      margin: theme.spacing(0.3)
    }
  }
}));

function Tabla({ titulo, columnas, datos, activable, ancho }) {
  const history = useHistory();
  const classes = useStyles();
  const [columnastabla, setColumnasTabla] = useState([]);
  const [datostabla, setDatosTabla] = useState([]);

  let w = "";
  if (useMediaQuery(theme => theme.breakpoints.down("sm"))) {
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
            lastTooltip: "Ultima Página"
          },
          toolbar: {
            searchTooltip: "Buscar ",
            searchPlaceholder: "Buscar",
            exportTitle: "Exportar Datos",
            exportAriaLabel: "Exportar Datos",
            exportName: "Exportar como CVS"
          },
          body: {
            emptyDataSourceMessage: "No hay datos"
          },
          header: {
            actions: "Acciones"
          }
        }}
        actions={[
          {
            icon: () => (
              <Switch
                checked={true}
                /* onChange={() => () } */
                color="primary"
                name="checkedB"
                size="small"
              />
            ),
            tooltip: "Activar o Desactivar producto",
            onClick: event => alert("cambiar estado"),
            hidden: !activable
          },
          {
            icon: () => <Edit fontSize="large" />,
            tooltip: "Editar",
            onClick: (event, rowData) => alert("You saved " + rowData.name)
          },
          rowData => ({
            icon: () => <DeleteOutline fontSize="large" />,
            tooltip: "Eliminar",
            onClick: (event, rowData) =>
              alert("You want to delete " + rowData.name)
            /* disabled: rowData.birthYear < 2000 */
          }),
          {
            icon: () => (              
                <AddIcon fontSize="large" color='primary'/>              
            ),
            tooltip: "Agregar nuevo",
            isFreeAction: true,
            onClick: () => history.push(`/${titulo}/nuevo`)
          }
        ]}
        options={{
          actionsColumnIndex: -1,
          rowStyle: {
            backgroundColor: "#EEE"
          },
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
            fontSize: "1.5rem"
          },
          cellStyle: {
            fontSize: "1.2rem"
          },
          searchFieldStyle: {
            fontSize: "1.2rem"
          },
          filtering: true,
          exportButton: true
        }}
        icons={{}}
      />
    </div>
  );
}

export default Tabla;
