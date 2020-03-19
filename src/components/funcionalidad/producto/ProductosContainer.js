import React, { Fragment } from "react";
import AppFrame from "../../layout/AppFrame";
import { Grid  } from "@material-ui/core";
import Tabla from "../../layout/Tabla";


function ProductosContainer() {
  const columns = [    
    { title: 'Avatar', field: "img", render: rowData => <img src={rowData.img} style={{width: 50, borderRadius: '30%'}}/> },
    { title: "id", field: "id" },
    { title: "nombre", field: "nombre" },
    { title: "precio", field: "precio", type: "numeric" },
    { title: "descripcion", field: "descripcion" },    
    { title: "aplica_iva", field: "aplica_iva" },
    { title: "categoria", field: "categoria" }
  ];
  const data = [
    { img:'http://avatars.design/wp-content/uploads/2016/09/avatar_collection_grid-3.jpg', id: '1', nombre:'pp', precio:'45', descripcion:'kjahksjfhsf',  aplica_iva:'si', categoria:'Bebidas' },
    { img:'http://avatars.design/wp-content/uploads/2016/09/avatar_collection_grid-3.jpg', id: '1', nombre:'pp', precio:'45', descripcion:'kjahksjfhsf',  aplica_iva:'si', categoria:'Bebidas' },
    { img:'http://avatars.design/wp-content/uploads/2016/09/avatar_collection_grid-3.jpg', id: '1', nombre:'pp', precio:'45', descripcion:'kjahksjfhsf',  aplica_iva:'si', categoria:'Bebidas' },   
  ];

  const renderBody = () => (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Tabla titulo="Productos" columnas={columns} datos={data} activable={true} />
        </Grid>
      </Grid>
    </Fragment>
  );

  return <AppFrame titulo="Listado de Productos" body={renderBody()} />;
}

export default ProductosContainer;
