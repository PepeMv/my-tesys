import React, { Fragment } from 'react';
import AppFrame from '../../layout/AppFrame';
import { Grid } from '@material-ui/core';
import Tabla from '../../layout/Tabla';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerUsuariosAction } from '../../../actions/usuarioActions';
import Spinner from '../../layout/Spinner';

const UsuariosContainer = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.usuario.loading);
  const data = useSelector((state) => state.usuario.listadoUsuarios);

  useEffect(() => {
    const cargarUsuarios = () => dispatch(obtenerUsuariosAction());
    cargarUsuarios();
    //eslint-disable-next-line
  }, []);

    const columns = [           
        //{ title: "id", field: "id" },
        { title: "Nombre", field: "nombre" },
        { title: "Apellido", field: "apellido" },
        { title: "Nº doc.", field: "numeroDocumento", type: "numeric" },
        //{ title: "password", field: "password" },    
        { title: "email", field: "email"},
        //{ title: "direccion", field: "direccion" },
        { title: "Telefono", field: "telefono", type: "numeric" },
        { title: "Tipo", field: "tipoUsuario", lookup: { cliente: 'Cliente', usuario: 'Usuario' } }
      ];
      /* const data = [
        {id:1, nombre:'Juan Jose', apellido:'Mesias', cedula:'1804569364', password:'456123', email:'pepemv1997@gmail.com', direccion:'patate', telefono:'0983075722', tipo:'usuario'}
      ]; */

    const renderBody = () => (
        <Fragment>
          <Spinner active={loading} />
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