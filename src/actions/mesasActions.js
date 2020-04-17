import {
  AGREGAR_MESA,
  AGREGAR_MESA_EXITO,
  AGREGAR_MESA_ERROR,
  COMENZAR_DESCARGA_MESAS,
  DESCARGAR_MESAS_EXITO,
  DESCARGAR_MESAS_ERROR,
  OBTENER_MESA_ELIMINAR,
  ELIMINAR_MESA_EXITO,
  ELIMINAR_MESA_ERROR,
  OBTENER_MESA_EDITAR,
  COMENZAR_MESA_EDITAR,
  EDITAR_MESA_EXITO,
  EDITAR_MESA_ERROR
} from "./../types";

import { alerta } from "./../components/layout/AlertaCRUD";
import clienteAxios from "./../config/axios";
import uuid from "react-uuid";

export function insertarMesaAction(mesa) {
  return async (dispatch) => {
    dispatch(agregarMesa());
    //console.log(mesa);
    let formData = new FormData();
    formData.append("nombre", mesa.nombre);
    formData.append("qr", uuid());
    formData.append("descripcion", mesa.descripcion);
    console.log(formData);
    try {
      const respuesta = await clienteAxios.post("/mesas", formData);
      //console.log(respuesta);
      if (respuesta.data.HttpResponse.statusText === "success") {
        dispatch(agregarMesaExito(respuesta.data.mesa));
        console.log(respuesta.data);
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      } else {
        dispatch(agregarMesaError());
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      }
    } catch (error) {
      dispatch(agregarMesaError());
      alerta("Algo salio mal, revise su red!", "error");
    }
  };
}
//agregar mesa
const agregarMesa = () => ({
  type: AGREGAR_MESA,
  payload: true,
});
//agregar mesa exito
const agregarMesaExito = (mesa) => ({
  type: AGREGAR_MESA_EXITO,
  payload: mesa,
});
//agregar mesa error
const agregarMesaError = () => ({
  type: AGREGAR_MESA_ERROR,
  payload: true,
});

//obtener mesas
export function obtenerMesasAction() {
  return async (dispatch) => {
    dispatch(comienzaDescargaMesas());

    try {
      const respuesta = await clienteAxios.get("/mesas");
      //console.log(respuesta.data);
      dispatch(descargaMesasExito(respuesta.data.mesas));
    } catch (error) {
      dispatch(descargaMesasError());
    }
  };
}
//comenzar descarga mesas
const comienzaDescargaMesas = () =>({
    type: COMENZAR_DESCARGA_MESAS,
    payload: true
});
//descraga mesas exito
const descargaMesasExito = ( mesas ) => ({
    type: DESCARGAR_MESAS_EXITO,
    payload: mesas
});
//descraga mesas error
const descargaMesasError = () =>({
    type: DESCARGAR_MESAS_ERROR,
    payload: true
});

//eliminarMesa
export function eliminarMesaAction (id){
    return async (dispatch) => {
        dispatch( obtenerMesaEliminar(id) );

        try {
            const respuesta = await clienteAxios.delete(`/mesas/${id}`);
            //console.log(respuesta);
            if(respuesta.data.HttpResponse.statusText==='success'){
              dispatch( eliminarMesaExito(id) );
              alerta(respuesta.data.HttpResponse.message,respuesta.data.HttpResponse.statusText);
            }else{
              dispatch( eliminarMesaError());
              alerta(respuesta.data.HttpResponse.message,respuesta.data.HttpResponse.statusText);
            }
        } catch (error) {
          dispatch( eliminarMesaError());
          alerta('Algo salio mal, revise su red!','error');
        }
    };
}
//obtener eliminar mesa 
const obtenerMesaEliminar = (id) =>({
    type: OBTENER_MESA_ELIMINAR,
    payload: id
});
//eliminar mesa exito 
const eliminarMesaExito = () => ({
    type: ELIMINAR_MESA_EXITO,    
});
//eliminar mesa error
const eliminarMesaError = () => ({
    type: ELIMINAR_MESA_ERROR,
    payload: true
});

//editar mesa 
//obtener mesa a editar
export function obtenerMesaEditarAction ( mesa ){
    return (dispatch) => {
      dispatch( obtenerMesaEditar( mesa ));
    };
}
//obetner mesa editar 
const obtenerMesaEditar = (mesa) => ({
    type: OBTENER_MESA_EDITAR,
    payload: mesa
});

export function editarMesaAction ( mesa){
    return async (dispatch) => {
      dispatch( comenzarEditarMesa());
      /*let formData = new FormData();
       formData.append("nombre", categoria.nombre);
      formData.append("activo", categoria.activo); */
      try {
        const respuesta = await clienteAxios.put(`/mesas/${mesa.id}`, mesa);
        if (respuesta.data.HttpResponse.statusText === "success") {        
          dispatch( editarMesaExito(respuesta.data.mesa) );
          alerta(respuesta.data.HttpResponse.message,respuesta.data.HttpResponse.statusText);        
        } else {        
          dispatch( editarMesaError() );
          alerta(respuesta.data.HttpResponse.message,respuesta.data.HttpResponse.statusText);
        }
      } catch (error) {
        dispatch( editarMesaError() );
          alerta('Algo salio mal, revise su red!','error');
      }    
    };
}
//comenzar editar  mesa
const comenzarEditarMesa = () =>({
    type: COMENZAR_MESA_EDITAR,
    payload: true
});

const editarMesaExito = (mesa) =>({
    type: EDITAR_MESA_EXITO,
    payload: mesa
});

const editarMesaError = () => ({
    type: EDITAR_MESA_ERROR,
    payload: true
});