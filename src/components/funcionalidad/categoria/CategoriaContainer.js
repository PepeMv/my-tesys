import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import Tabla from '../../layout/Tabla';
import AppFrame from '../../layout/AppFrame';

const columns = [    
    { title: "id", field: "id" },
    { title: "nombre", field: "nombre" },    
  ];
  const data = [
    { id: '1', nombre:'pp' },
    { id: '2', nombre:'pp' },
    
  ];
  
  const renderBody = () => (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Tabla titulo="Categorias" columnas={columns} datos={data} activable={false} ancho='50%' />
        </Grid>
      </Grid>
    </Fragment>
  );

const CategoriaContainer = () => {
    return <AppFrame titulo="Listado de Categorias" body={renderBody()} />;
};

export default CategoriaContainer;