import {
  OBTENER_USUARIO,
  OBTENER_USUARIO_EXITO,
  OBTENER_USUARIO_ERROR,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
  COMENZAR_DESCARGA_DATOSFACTURACION,
  DESCARGA_DATOSFACTURACION_EXITO,
  DESCARGA_DATOSFACTURACION_ERROR,
  COMENZAR_INSERTAR_DATOSFACTURACION,
  INSERTAR_DATOSFACTURACION_EXITO,
  INSERTAR_DATOSFACTURACION_ERROR,
  COMENZAR_USUARIO_EDITAR,
  EDITAR_USUARIO_EXITO,
  EDITAR_USUARIO_ERROR,
  COMENZAR_DESCARGA_PEDIDOS_USUARIO,
  DESCARGA_PEDIDOS_USUARIO_EXITO,
  DESCARGA_PEDIDOS_USUARIO_ERROR,
  AGREGAR_PEDIDO_STATE,
  AGREGAR_DETALLE_STATE
} from "./../types";
import { alerta } from "./../components/layout/AlertaCRUD";
import clienteAxios from "./../config/axios";
import jwt from "jsonwebtoken";

export function logearUsuario(credenciales) {
  return async (dispatch) => {
    let formData = new FormData();
    formData.append("email", credenciales.email);
    formData.append("password", credenciales.password);
    try {
      const respuesta = await clienteAxios.post("/usuario/login", formData);
      //console.log(respuesta);
      if (respuesta.data.HttpResponse.statusText === "success") {
        dispatch(logeoExito(respuesta.data.token));

        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );

        //console.log(id);
        dispatch(getUsuarioAutenticado());
      } else {
        dispatch(logeoError(respuesta.data.HttpResponse.message));
        alert("ierda");
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      }
      return respuesta.data.HttpResponse.statusText;
    } catch (error) {
      dispatch(logeoError());
      alerta("Algo salio mal, revise su red!", "error");
    }
  };
}
//logeo exito
const logeoExito = (token) => ({
  type: LOGIN_EXITOSO,
  payload: token,
});
//logeo error
const logeoError = (mensaje) => ({
  type: LOGIN_ERROR,
  payload: mensaje,
});

//getUsuario autenticdo
export function getUsuarioAutenticado() {
  return async (dispatch) => {
    dispatch(comenzarObetnerUsuario());
    const token = localStorage.getItem("reTomasToken");
    const id = jwt.decode(token);
    try {
      const respuesta = await clienteAxios.get(`/usuariosById?id=${id.sub}`);
      if (respuesta.data.HttpResponse.statusText === "success") {
        dispatch(getUsuarioExito(respuesta.data.usuario));
        if (respuesta.data.usuario.tipoUsuario === "cliente") {
          dispatch(obtenerDatosDeFacturacionAction(id.sub));
          dispatch(obtenerPedidosyDetalles(id.sub));
        }
      } else {
        dispatch(getUsuarioError());
      }
    } catch (error) {
      dispatch(getUsuarioError());
    }
  };
}
//comenzar obtener usuario
const comenzarObetnerUsuario = () => ({
  type: OBTENER_USUARIO,
  payload: true,
});
// get usuario exito
const getUsuarioExito = (usuario) => ({
  type: OBTENER_USUARIO_EXITO,
  payload: usuario,
});
//usuario error get
const getUsuarioError = () => ({
  type: OBTENER_USUARIO_ERROR,
  payload: true,
});
//cerrar sesion
export function cerrarSesionAction() {
  return async (dispatch) => {
    dispatch(cerrarSesion());
  };
}
const cerrarSesion = () => ({
  type: CERRAR_SESION,
});
//obtener mis pedidos y detalles
export function obtenerPedidosyDetalles(id) {
  return async (dispatch) => {
    dispatch(comienzaDescargaPedidosUsuario());

    try {
      const respuesta = await clienteAxios.get(`/pedidosByUsuario/${id}`);
      //console.log(respuesta.data);
      dispatch(descargaDatosPedidosUsuarioExito(respuesta.data));
    } catch (error) {
      dispatch(descargaDatosPedidosUsuarioError());
    }
  };
}
//CONST COMENZAR DESCARGA
const comienzaDescargaPedidosUsuario = () => ({
  type: COMENZAR_DESCARGA_PEDIDOS_USUARIO,
  payload: true,
});
//descragar pedidos usuario exito
const descargaDatosPedidosUsuarioExito = (data) => ({
  type: DESCARGA_PEDIDOS_USUARIO_EXITO,
  payload: data,
});
//descraga pedidos usuario error
const descargaDatosPedidosUsuarioError = () => ({
  type: DESCARGA_PEDIDOS_USUARIO_ERROR,
  payload: true,
});

//obtener datos de facturacion
export function obtenerDatosDeFacturacionAction(id) {
  return async (dispatch) => {
    dispatch(comienzaDescargaDatosFacturacion());

    try {
      const respuesta = await clienteAxios.get(`/datosFacturacion/${id}`);
      //console.log(respuesta.data);
      dispatch(descargaDatosFacturacionExito(respuesta.data.datos));
    } catch (error) {
      dispatch(descargaDatosFacturacionError());
    }
  };
}
//comnezar
const comienzaDescargaDatosFacturacion = () => ({
  type: COMENZAR_DESCARGA_DATOSFACTURACION,
  payload: true,
});
//datos factiracion exito
const descargaDatosFacturacionExito = (datos) => ({
  type: DESCARGA_DATOSFACTURACION_EXITO,
  payload: datos,
});
//descraga datos facturacopnm error
const descargaDatosFacturacionError = () => ({
  type: DESCARGA_DATOSFACTURACION_ERROR,
  payload: true,
});

//inseratr dato de factuiracion
export function insertarDatoFacturacionAction(dato) {
  return async (dispatch) => {
    dispatch(agregarDatoFacturacion());

    let formData = new FormData();
    formData.append("tipoDocumento", dato.tipoDocumento);
    formData.append("numeroDocumento", dato.numeroDocumento);
    formData.append("nombre", dato.nombre);
    formData.append("direccion", dato.direccion);
    formData.append("telefono", dato.telefono);
    formData.append("idUsuario", dato.idUsuario);

    try {
      const respuesta = await clienteAxios.post("/datosFacturacion", formData);
      //console.log(respuesta);
      if (respuesta.data.HttpResponse.statusText === "success") {
        dispatch(agregarDatosFacturacionExito(respuesta.data.datos));
        //console.log(respuesta.data.categoria);
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      } else {
        dispatch(agregardatosFacturacionError());
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      }
      return respuesta.data.HttpResponse.statusText;
    } catch (error) {
      dispatch(agregardatosFacturacionError());
      alerta("Algo salio mal, revise su red!", "error");
    }
  };
}
//comenzar insertar dato
const agregarDatoFacturacion = () => ({
  type: COMENZAR_INSERTAR_DATOSFACTURACION,
  payload: true,
});
//inseratr dato extio
const agregarDatosFacturacionExito = (dato) => ({
  type: INSERTAR_DATOSFACTURACION_EXITO,
  payload: dato,
});
//insertar dato error
const agregardatosFacturacionError = () => ({
  type: INSERTAR_DATOSFACTURACION_ERROR,
  payload: true,
});

//editar el usuario logeado
//comenzar a editar
export function editarUsuarioLogeadoAction(usuario) {
  return async (dispatch) => {
    dispatch(comenzarEditarUsuario());

    try {
      const respuesta = await clienteAxios.put(
        `/usuarios/${usuario.id}`,
        usuario
      );
      if (respuesta.data.HttpResponse.statusText === "success") {
        dispatch(editarUsuarioExito(respuesta.data.usuario));
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      } else {
        dispatch(editarUsuarioError());
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      }
      //return respuesta.data.HttpResponse.statusText;
    } catch (error) {
      dispatch(editarUsuarioError());
      alerta("Algo salio mal, revise su red!", "error");
    }
  };
}
//comenzar editar
const comenzarEditarUsuario = () => ({
  type: COMENZAR_USUARIO_EDITAR,
  payload: true,
});
//ediatr usuario exito
const editarUsuarioExito = (usuario) => ({
  type: EDITAR_USUARIO_EXITO,
  payload: usuario,
});
//editar usuario error
const editarUsuarioError = () => ({
  type: EDITAR_USUARIO_ERROR,
  payload: true,
});
//agregar a mi state pedido realizado 
export function agregarPedidoStateAction(pedido){
  return async (dispatch) => {
    dispatch( agregarPedido(pedido) );
  }
};
const agregarPedido = (pedido) => ({
  type: AGREGAR_PEDIDO_STATE,
  payload: pedido
});
//agregar detalle statae
export function agregarDetalleStateAction (detalle){
  return async (dispatch) => {
    dispatch( agregarDetalle(detalle) );
  }
};
const agregarDetalle = (detalle) => ({
  type: AGREGAR_DETALLE_STATE,
  payload: detalle
});