import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGAR_PRODUCTOS_EXITO,
  DESCARGAR_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  ELIMINAR_PRODUCTO_EXITO,
  ELIMINAR_PRODUCTO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_PRODUCTO_EDITAR,
  EDITAR_PRODUCTO_EXITO,
  EDITAR_PRODUCTO_ERROR
} from "./../types";

import { alerta } from "./../components/layout/AlertaCRUD";
import clienteAxios from "./../config/axios";

export function insertarProductoAction(producto) {
  //console.log(producto);
  return async (dispatch) => {
    dispatch(insertarProducto());

    let formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio);
    formData.append("idCategoria", producto.id_categoria);
    formData.append("aplicaiva", 1);
    formData.append("imagen", producto.imagen);
    formData.append("descripcion", producto.descripcion);
    formData.append("activo", 1);    

    try {
      const respuesta = await clienteAxios.post("/productos/store", formData);
      //console.log(respuesta);
      if (respuesta.data.HttpResponse.statusText === "success") {
        dispatch(agregarProductoExito(respuesta.data));
        console.log(respuesta.data);        
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      } else {
        dispatch(agregarProductoError());
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(agregarProductoError());
      alerta("Algo salio mal, revise su red!", "error");
    }
  };
}

//insertarProdyucto
const insertarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});
//producto insertado excito
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});
//agragr producto error
const agregarProductoError = () => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: true,
});

//obetner productos
export function obtenerProductosAction (){
    return async (dispatch) => {
        dispatch( comienzaDescargaProductos());
  
        try {
          const respuesta = await clienteAxios.get("/productos");
          //console.log(respuesta.data);
          dispatch( descargaProductosExito( respuesta.data) );
        } catch (error) {
            dispatch( descargaproductosError());
        }
    };
}
//comenzar descarga prtoductos
const comienzaDescargaProductos = () =>({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});
//descarga products exito
const descargaProductosExito = ( productos ) =>({
    type: DESCARGAR_PRODUCTOS_EXITO,
    payload: productos
});
//descarga productos error
const descargaproductosError = () =>({
    type: DESCARGAR_PRODUCTOS_ERROR,
    payload: true
});

//eliminar producto
export function eliminarProductoAction (id){
    return async (dispatch) => {
        dispatch( obtenerProductoEliminar(id) );

        try {
            const respuesta = await clienteAxios.delete(`/productos/${id}`);
            //console.log(respuesta);
            if(respuesta.data.HttpResponse.statusText==='success'){
              dispatch( eliminarProductoExito(id) );
              alerta(respuesta.data.HttpResponse.message,respuesta.data.HttpResponse.statusText);
            }else{
              dispatch( eliminarProductoError());
              alerta(respuesta.data.HttpResponse.message,respuesta.data.HttpResponse.statusText);
            }
        } catch (error) {
          dispatch( eliminarProductoError());
          alerta('Algo salio mal, revise su red!','error');
        }
    };
} 
//obtener producto eliminar 
const obtenerProductoEliminar = (id) =>({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});
//eliminar producto exito
const eliminarProductoExito = () =>({
    type: ELIMINAR_PRODUCTO_EXITO
});
//eliminar producto error
const eliminarProductoError = () =>({
    type: ELIMINAR_PRODUCTO_ERROR,
    payload: true
});

//ediatr producto
//obtener producto a editar
export function obtenerProductoEditarAction ( producto ){
    return (dispatch) => {
      dispatch( obtenerProductoEditar( producto ));
    };
}
//obtener producto editar
const obtenerProductoEditar = ( producto ) =>({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
});

export function editarProductoAction ( producto ){
  return async (dispatch) => {
    //console.log(producto);
    dispatch( comenzarEditarProducto());
    let formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio);
    formData.append("idCategoria", producto.idCategoria);
    formData.append("aplicaiva", 1);
    formData.append("imagen", producto.imagen);
    formData.append("descripcion", producto.descripcion);
    formData.append("activo", producto.activo);   
    
    try {
      const respuesta = await clienteAxios.post(`/productos/update/${producto.id}`, formData);
      if (respuesta.data.HttpResponse.statusText === "success") {        
        dispatch( editarProductoExito(respuesta.data) );
        
        alerta(respuesta.data.HttpResponse.message,respuesta.data.HttpResponse.statusText);        
      } else {        
        dispatch( editarProductoError() );
        alerta(respuesta.data.HttpResponse.message,respuesta.data.HttpResponse.statusText);
      }
    } catch (error) {
      dispatch( editarProductoError() );
        alerta('Algo salio mal, revise su red!','error');
    }
  }
}

//comezar editar prodicto 
const comenzarEditarProducto = () => ({
  type: COMENZAR_PRODUCTO_EDITAR,
  payload: true
});

//ediatr producto exit
const editarProductoExito = (producto) => ({
  type: EDITAR_PRODUCTO_EXITO,
  payload: producto
});
//editar producto error
const editarProductoError = () => ({
  type: EDITAR_PRODUCTO_ERROR,
  payload: true
});
