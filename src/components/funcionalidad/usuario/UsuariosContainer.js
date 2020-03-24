import React, { Fragment } from 'react';
import AppFrame from '../../layout/AppFrame';
import { Grid } from '@material-ui/core';
import Tabla from '../../layout/Tabla';

const UsuariosContainer = () => {

    const columns = [           
        { title: "id", field: "id" },
        { title: "nombre", field: "nombre" },
        { title: "apellido", field: "apellido" },
        { title: "cedula", field: "cedula", type: "numeric" },
        { title: "password", field: "password" },    
        { title: "email", field: "email"},
        { title: "direccion", field: "direccion" },
        { title: "telefono", field: "telefono", type: "numeric" },
        { title: "tipo", field: "tipo", lookup: { cliente: 'Cliente', usuario: 'Usuario' } }
      ];
      const data = [
        {id:1, nombre:'Juan Jose', apellido:'Mesias', cedula:'1804569364', password:'456123', email:'pepemv1997@gmail.com', direccion:'patate', telefono:'0983075722', tipo:'usuario'}
      ];

    const renderBody = () => (
        <Fragment>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Tabla titulo="usuarios" columnas={columns} datos={data} activable={false} ancho='95%'/>
            </Grid>
          </Grid>
        </Fragment>
      );

    return <AppFrame titulo="Listado de Usuarios" body={renderBody()} />;
};

export default UsuariosContainer;