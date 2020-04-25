import {
  AGREGAR_CATEGORIA,
  AGREGAR_CATEGORIA_EXITO,
  AGREGAR_CATEGORIA_ERROR,
  COMENZAR_DESCARGA_CATEGORIAS,
  DESCARGAR_CATEGORIAS_EXITO,
  DESCARGAR_CATEGORIAS_ERROR,
  OBTENER_CATEGORIA_ELIMINAR,
  ELIMINAR_CATEGORIA_EXITO,
  ELIMINAR_CATEGORIA_ERROR,
  OBTENER_CATEGORIA_EDITAR,
  COMENZAR_CATEGORIA_EDITAR,
  EDITAR_CATEGORIA_EXITO,
  EDITAR_CATEGORIA_ERROR,
} from "./../types";
import { alerta } from "./../components/layout/AlertaCRUD";
import clienteAxios from "./../config/axios";

export function insertarCategoriaAction(categoria) {
  return async (dispatch) => {
    dispatch(agregarCategoria());

    let formData = new FormData();
    formData.append("nombre", categoria.nombre);
    formData.append("activo", 1);
    try {
      const respuesta = await clienteAxios.post("/categorias", formData);
      //console.log(respuesta);
      if (respuesta.data.HttpResponse.statusText === "success") {
        dispatch(agregarCategoriaExito(respuesta.data.categoria));
        //console.log(respuesta.data.categoria);
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      } else {
        dispatch(agregarCategoriaError());
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      }
      return respuesta.data.HttpResponse.statusText;
    } catch (error) {
      dispatch(agregarCategoriaError());
      alerta("Algo salio mal, revise su red!", "error");
    }
  };
}

//agregar categoria
const agregarCategoria = () => ({
  type: AGREGAR_CATEGORIA,
  payload: true,
});

//agregar categoria exito
const agregarCategoriaExito = (categoria) => ({
  type: AGREGAR_CATEGORIA_EXITO,
  payload: categoria,
});
//agregar Categoria Error
const agregarCategoriaError = () => ({
  type: AGREGAR_CATEGORIA_ERROR,
  payload: true,
});

//obetener categorias
export function obtenerCategoriasAction() {
  return async (dispatch) => {
    dispatch(comienzaDescargaCategorias());

    try {
      const respuesta = await clienteAxios.get("/categorias");
      //console.log(respuesta.data);
      dispatch(descargaCategoriasExito(respuesta.data.categorias));
    } catch (error) {
      dispatch(descargaCategoriasError());
    }
  };
}

//comenzar descarga categorias
const comienzaDescargaCategorias = () => ({
  type: COMENZAR_DESCARGA_CATEGORIAS,
  payload: true,
});
//descargaCaterorias exito
const descargaCategoriasExito = (categorias) => ({
  type: DESCARGAR_CATEGORIAS_EXITO,
  payload: categorias,
});
//decargaCategoriasError
const descargaCategoriasError = () => ({
  type: DESCARGAR_CATEGORIAS_ERROR,
  payload: true,
});

//Eliminar categoria
export function eliminarCategoriaAction(id) {
  return async (dispatch) => {
    dispatch(obtenerCategoriaEliminar(id));

    try {
      const respuesta = await clienteAxios.delete(`/categorias/${id}`);
      //console.log(respuesta);
      if (respuesta.data.HttpResponse.statusText === "success") {
        dispatch(eliminarCategoriaExito(id));
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      } else {
        dispatch(eliminarCategoriaError());
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      }
    } catch (error) {
      dispatch(eliminarCategoriaError());
      alerta("Algo salio mal, revise su red!", "error");
    }
  };
}

//obtener categoria
const obtenerCategoriaEliminar = (id) => ({
  type: OBTENER_CATEGORIA_ELIMINAR,
  payload: id,
});
//eliminar categoria exito
const eliminarCategoriaExito = () => ({
  type: ELIMINAR_CATEGORIA_EXITO,
});
//eliminar Error
const eliminarCategoriaError = () => ({
  type: ELIMINAR_CATEGORIA_ERROR,
  payload: true,
});

//Obtenerla categoria a edita
export function obtenerCategoriaEditarAction(categoria) {
  return (dispatch) => {
    dispatch(obtenerCategoriaEditar(categoria));
  };
}
//obetenr categoria
const obtenerCategoriaEditar = (categoria) => ({
  type: OBTENER_CATEGORIA_EDITAR,
  payload: categoria,
});

export function editarCategoriaAction(categoria) {
  return async (dispatch) => {
    dispatch(comenzarEditarCategoria());
    let formData = new FormData();
    formData.append("nombre", categoria.nombre);
    formData.append("activo", categoria.activo);

    try {
      const respuesta = await clienteAxios.put(
        `/categorias/${categoria.id}`,
        categoria
      );
      if (respuesta.data.HttpResponse.statusText === "success") {
        dispatch(editarCategoriaExito(respuesta.data.categoria));
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      } else {
        dispatch(editarCategoriaError());
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      }
      //return respuesta.data.HttpResponse.statusText;
    } catch (error) {
      dispatch(editarCategoriaError());
      alerta("Algo salio mal, revise su red!", "error");
    }
  };
}

//comenzar editar
const comenzarEditarCategoria = () => ({
  type: COMENZAR_CATEGORIA_EDITAR,
  payload: true,
});

//ediatr exito
const editarCategoriaExito = (categoria) => ({
  type: EDITAR_CATEGORIA_EXITO,
  payload: categoria,
});

//ediatr categoria error
const editarCategoriaError = () => ({
  type: EDITAR_CATEGORIA_ERROR,
  payload: true,
});
