import React, { Fragment, useEffect } from "react";
import AppFrame from "../../layout/AppFrame";
import { Grid, Box  } from "@material-ui/core";
import Tabla from "../../layout/Tabla";
import { useSelector } from "react-redux";
import { useState } from "react";
import Spinner from "../../layout/Spinner";

/* lookup: { cliente: 'Cliente', usuario: 'Usuario' } */

function ProductosContainer() {

  const [look, setLook] = useState({});

  const loading = useSelector((state) => state.productos.loading);
  const data = useSelector((state) => state.productos.listadoProductos );
  const imagenes = useSelector((state) => state.productos.imagenes );
  const categorias = useSelector((state) => state.categorias.listadoCategorias);

  useEffect(() => {
    const lookUpCategorias = (categorias) =>{
      let obj = {};
      categorias.forEach(element => {
        obj[element.id] = element.nombre
      });
      return obj;
    };
    const preLook = lookUpCategorias(categorias);
    setLook(preLook);
  }, [])
  const columns = [    
    { title: 'Avatar', render: rowData => <img alt='avatar' src={imagenes.find( img => img.id ===rowData.id).url} style={{width: 50, borderRadius: '30%'}}/> , filtering: false, sorting: false},
    /* { title: "id", field: "id" }, */
    { title: "Nombre", field: "nombre" },
    { title: "Descripcion", field: "descripcion" },
    { title: "Precio", field: "precio", type: "numeric" },
    /* { title: "aplica_iva", field: "aplica_iva" }, */
    { title: "Categoria", field: 'idCategoria', lookup: look },
  ];
  /* const data = [
    { img:'http://avatars.design/wp-content/uploads/2016/09/avatar_collection_grid-3.jpg', id: '1', nombre:'pp', precio:'45', descripcion:'kjahksjfhsf',  aplica_iva:'si', categoria:'Bebidas' },
    { img:'http://avatars.design/wp-content/uploads/2016/09/avatar_collection_grid-3.jpg', id: '1', nombre:'pp', precio:'45', descripcion:'kjahksjfhsf',  aplica_iva:'si', categoria:'Bebidas' },
    { img:'http://avatars.design/wp-content/uploads/2016/09/avatar_collection_grid-3.jpg', id: '1', nombre:'pp', precio:'45', descripcion:'kjahksjfhsf',  aplica_iva:'si', categoria:'Bebidas' },   
  ]; */

  const renderBody = () => (
    <Fragment>
      <Spinner active={loading} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Tabla titulo="productos" columnas={columns} datos={data} activable={true} ancho='90%'/>
        </Grid>
      </Grid>
    </Fragment>
  );

  return <AppFrame titulo="Listado de Productos" body={renderBody()} />;
}

export default ProductosContainer;
