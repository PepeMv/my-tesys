import React, { useState } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";

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

function Tabla({ titulo, columnas, datos, activable }) {
  const classes = useStyles();
  const [columnastabla, setColumnasTabla] = useState([]);
  const [datostabla, setDatosTabla] = useState([]);

  return (
    <div className={classes.paper}>
      <MaterialTable
        title={null}
        columns={columnas}
        data={datos}
        /* columns={[
          { title: "Name", field: "name" },
          { title: "Surname", field: "surname" },
          { title: "Birth Year", field: "birthYear", type: "numeric" },
          {
            title: "Birth Place",
            field: "birthCity",
            lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
          }
        ]}
        data={[
          { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
          {
            name: "Zerya Betül",
            surname: "Baran",
            birthYear: 2017,
            birthCity: 34
          }
        ]} */
        localization={{
          pagination: {
            labelRowsSelect: "Filas"
          },
          toolbar: {
            searchTooltip: "Buscar ",
            searchPlaceholder: "Buscar"
          },
          body: {
            emptyDataSourceMessage: "No hay datos"
          },
          header:{
            actions:'Acciones'
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
            icon: () => <Edit />,
            tooltip: "Editar",
            onClick: (event, rowData) => alert("You saved " + rowData.name)
          },
          rowData => ({
            icon: () => <DeleteOutline />,
            tooltip: "Eliminar",
            onClick: (event, rowData) =>
              alert("You want to delete " + rowData.name)
            /* disabled: rowData.birthYear < 2000 */
          }),
          {
            icon: () => <AddBox fontSize="large" color='primary'/> ,
            tooltip: "Agregar nuevo",
            isFreeAction: true,
            onClick: event => alert("You want to add a new row")
          },          
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
        }}
      />
    </div>
  );
}

export default Tabla;
