import { 
  OBTENER_NUMERO_ITEMS_PEDIDO, 
  COMENZAR_AGREGAR_PEDIDO, 
  AGREGAR_PEDIDO_EXITO,
  AGREGAR_PEDIDO_ERROR,
  COMENZAR_DESCARGA_PEDIDOS_PREPARAR,
  DESCARGA_PEDIDOS_PREPARAR_EXITO,
  DESCARGA_PEDIDOS_PREPARAR_ERROR,
  AGREGAR_PEDIDO_LIVE,
  AGREGAR_DETALLE_LIVE,
  COMENZAR_DESCARGA_PEDIDOS_ENTREGAR,
  DESCARGA_PEDIDOS_ENTREGAR_EXITO,
  DESCARGA_PEDIDOS_ENTREGAR_ERROR,
  COMENZAR_DESCARGA_TODOS_PEDIDOS,
  DESCARGA_TODOS_PEDIDOS_EXITO,
  DESCARGA_TODOS_PEDIDOS_ERROR,
  COMENZAR_EDITAR_PEDIDO,
  EDITAR_PEDIDO_EXITO,
  EDITAR_PEDIDO_ERROR,
  AGREGAR_PEDIDO_ENTREGAR_LIVE,
  AGREGAR_DETALLE_ENTREGAR_LIVE,
  QUITAR_PEDIDO_PREPARAR_LIVE,
  QUITAR_DETALLE_PREPARAR_LIVE,
  QUITAR_PEDIDO_ENTREGAR_LIVE,
  QUITAR_DETALLE_ENTREGAR_LIVE
} from "./../types";
import clienteAxios from "../config/axios";
import { alerta, alertaConfirmacion } from "./../components/layout/AlertaCRUD";
import { agregarPedidoStateAction, agregarDetalleStateAction } from './logeoActions';


export function obtenerNumeroItemsPedidoAction(numero) {
  return (dispatch) => {
    dispatch(obtenerNumeroItemsPedido(numero));
  };
}

//obtener numero de items
const obtenerNumeroItemsPedido = (numero) => ({
    type: OBTENER_NUMERO_ITEMS_PEDIDO,
    payload: numero
});

//crear el pedido
export function insertarPedidoAction (total, subtotal, tipoPedido, usuario, datosFacturacion, productos, extra, lugar, iva){  
  return async (dispatch) => {
    dispatch( empezarInsertarPedido() );
    let formData = new FormData();
    formData.append('idUsuario', usuario.id );
    if(tipoPedido === "DOMICILIO"){
      formData.append('idEntrega', `lat:${lugar.lat}-long:${lugar.long}` );
    }else{
      formData.append('idEntrega', lugar.id );
    }
    //formData.append('idEntrega', usuario.id );
    formData.append('entregarPedido', lugar.nombre );
    if (tipoPedido === "DOMICILIO"){
      formData.append('totalPedido', (parseFloat(total)+parseFloat(extra)).toFixed(2) );
    }else{
      formData.append('totalPedido', total );
    }
    formData.append('tipoPedido', tipoPedido );
    formData.append('productos', JSON.stringify(productos) );
    formData.append('idDatosFacturacion', datosFacturacion.id );
    formData.append('nombreCliente', datosFacturacion.nombre );
    formData.append('numeroDocumento', datosFacturacion.numeroDocumento );
    formData.append('costoEnvio', extra );
    formData.append('iva', iva );
    
    try {
      const respuesta = await clienteAxios.post("/pedidos", formData);
    //console.log(respuesta);
    if (respuesta.data.HttpResponse.statusText === "success") {
      dispatch(agregarPedidoExito(respuesta.data));
      //console.log(respuesta.data.categoria);
      dispatch( agregarPedidoStateAction(respuesta.data.pedido) );
      respuesta.data.detalles.forEach(item => {
        dispatch( agregarDetalleStateAction(item) );
      });
      alertaConfirmacion(
        respuesta.data.HttpResponse.message,
        "Su orden se envio, sera notificado de la entrega!",
        respuesta.data.HttpResponse.statusText
      );
      
    } else {
      dispatch(agregarPedidoError());
      alerta(
        respuesta.data.HttpResponse.message,
        respuesta.data.HttpResponse.statusText
      );
    }
    return respuesta.data.HttpResponse.statusText;
    } catch (error) {
      dispatch(agregarPedidoError());
      alerta("Algo salio mal, revise su red!", "error");
    }
    
  }
};

//empezar isertar pedido
const empezarInsertarPedido = () =>({
  type: COMENZAR_AGREGAR_PEDIDO,
  payload: true
});
//agregar pedido exito 
const agregarPedidoExito = (data) => ({
  type: AGREGAR_PEDIDO_EXITO,
  payload: data
});

//agregar pedido error
const agregarPedidoError = () =>({
  type: AGREGAR_PEDIDO_ERROR,
  payload: true
});

// funcion para traer los pedidos y detalles pendientes
export function obtenerPedidosParaPrepararAction (){
  return async (dispatch) => {
    dispatch( comienzaDescargaPedidosParaPreparar() );

    try {
      const respuesta = await clienteAxios.get("/pedidosPreparar");
      //console.log(respuesta.data);
      dispatch( descargaPedidosParaPrepararExito( respuesta.data) );
    } catch (error) {
      dispatch( descargaPedidosParaPrepararError());
    }
  }
};

const comienzaDescargaPedidosParaPreparar = () => ({
  type: COMENZAR_DESCARGA_PEDIDOS_PREPARAR,
  payload: true
});

const descargaPedidosParaPrepararExito = (data) => ({
  type: DESCARGA_PEDIDOS_PREPARAR_EXITO,
  payload: data
});

const descargaPedidosParaPrepararError = () => ({
  type: DESCARGA_PEDIDOS_PREPARAR_ERROR,
  payload: true
});

//anadir pedido en vivo 
export function agregarPedidoyDetallePrepararLiveAction (pedido, detalle){
  //console.log(pedido);
  return async (dispatch) => {
    dispatch( agregarPedidoyDetalleLive( pedido));
    detalle.forEach(item => {
      dispatch( agregarDetalleLive(item) );
    });
  }
};

const agregarPedidoyDetalleLive = (pedido) => ({
  type: AGREGAR_PEDIDO_LIVE,
  payload: pedido
});
//add detalle
const agregarDetalleLive = (item) => ({
  type: AGREGAR_DETALLE_LIVE,
  payload: item
});

//obtener los pedidos para entregar 
export function obtenerPedidosParaEntregarAction (){
  return async (dispatch) => {
    dispatch( comienzaDescargaPedidosParaEntregar() );

    try {
      const respuesta = await clienteAxios.get("/pedidosEntregar");
      //console.log(respuesta.data);
      dispatch( descargaPedidosParaEntregarExito( respuesta.data) );
    } catch (error) {
      dispatch( descargaPedidosParaEntregarError());
    }
  }
}
// comenzar descargar peddos entregar
const comienzaDescargaPedidosParaEntregar = () => ({
  type: COMENZAR_DESCARGA_PEDIDOS_ENTREGAR,
  payload: true
});

const descargaPedidosParaEntregarExito = (data) => ({
  type: DESCARGA_PEDIDOS_ENTREGAR_EXITO,
  payload: data
});

const descargaPedidosParaEntregarError = () => ({
  type: DESCARGA_PEDIDOS_ENTREGAR_ERROR,
  payload: true
});


//obtener todos los pedidos
export function obtenerTodosLosPedidosAction(){
  return async (dispatch) => {
    dispatch( comenzarDescargaTodosPedidos());
    try {
      const respuesta = await clienteAxios.get("/pedidosGeneral");
      //console.log(respuesta.data);
      dispatch( descargaTodosPedidosExito( respuesta.data) );
    } catch (error) {
      dispatch( descargaTodosPedidosError());
    }
  }
};

const comenzarDescargaTodosPedidos = () => ({
  type: COMENZAR_DESCARGA_TODOS_PEDIDOS,
  payload: true
});

const descargaTodosPedidosExito = (data) => ({
  type: DESCARGA_TODOS_PEDIDOS_EXITO,
  payload: data
});

const descargaTodosPedidosError = () => ({
  type: DESCARGA_TODOS_PEDIDOS_ERROR,
  payload: true
});

//action para enviar el pedido de ESTADO    pedido a preparado
export function cambiarEstadoPedidoAPreparadoAction(id){
  return async (dispatch) => {
    dispatch(comenzarEditarPedido());

    try {
      const respuesta = await clienteAxios.put(`/actulizarPedido/${id}?estado=preparado`,);

      if (respuesta.data.HttpResponse.statusText === "success") {
        dispatch(editarPedidoExito());
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      } else {
        dispatch(editarPedidoError());
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      }
      //return respuesta.data.HttpResponse.statusText;
    } catch (error) {
      dispatch(editarPedidoError());
      alerta("Algo salio mal, revise su red!", "error");
    }
  }
};
//conebnzar editar pedido
const comenzarEditarPedido = () => ({
  type: COMENZAR_EDITAR_PEDIDO,
  payload: true
});
//editar pedido exito
const editarPedidoExito = () => ({
  type: EDITAR_PEDIDO_EXITO,  
});
//editar error
const editarPedidoError = () => ({
  type: EDITAR_PEDIDO_ERROR,
  payload: true
});

//añadir pedido a pedidos entregar y quitar de pedidos preparar
export function agregarPedidoEntregaryQuitarPedidoPrepararAction(pedido, detalles){
  return async (dispatch) => {
    dispatch( agregarPedidoEntregaryQuitarPedidoPreparar( pedido));
    detalles.forEach(item => {
      dispatch( agregarDetalleEntregaryQuitarDetallePreparar(item) );
    });
  }
};
//AGREGAR
const agregarPedidoEntregaryQuitarPedidoPreparar = (pedido) => ({
  type: AGREGAR_PEDIDO_ENTREGAR_LIVE,
  payload: pedido
});

const agregarDetalleEntregaryQuitarDetallePreparar = (item) => ({
  type: AGREGAR_DETALLE_ENTREGAR_LIVE,
  payload: item
});
////////////////////////////////////

//cambiar pedido a cancelado
export function cambiarEstadoPedidoCanceladoAction (id){
  return async (dispatch) => {
    dispatch(comenzarEditarPedido());

    try {
      const respuesta = await clienteAxios.put(`/actulizarPedido/${id}?estado=cancelado`,);

      if (respuesta.data.HttpResponse.statusText === "success") {
        dispatch(editarPedidoExito());
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      } else {
        dispatch(editarPedidoError());
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      }
      //return respuesta.data.HttpResponse.statusText;
    } catch (error) {
      dispatch(editarPedidoError());
      alerta("Algo salio mal, revise su red!", "error");
    }
  }
};

//////////////////////
export function quitarPedidoDePrepararAction(pedido, detalles){
  return async (dispatch) => {
    dispatch( quitarPedidoDePreparar( pedido));
    detalles.forEach(item => {
      dispatch( quitarDetalleDePreparar(item) );
    });
  }
};
//AGREGAR
const quitarPedidoDePreparar = (pedido) => ({
  type: QUITAR_PEDIDO_PREPARAR_LIVE,
  payload: pedido
});

const quitarDetalleDePreparar = (item) => ({
  type: QUITAR_DETALLE_PREPARAR_LIVE,
  payload: item
});

//cambiar pedido a entregado
export function cambiarEstadoPedidoEntregadoAction (id){
  return async (dispatch) => {
    dispatch(comenzarEditarPedido());

    try {
      const respuesta = await clienteAxios.put(`/actulizarPedido/${id}?estado=entregado`,);

      if (respuesta.data.HttpResponse.statusText === "success") {
        dispatch(editarPedidoExito());
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      } else {
        dispatch(editarPedidoError());
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      }
      //return respuesta.data.HttpResponse.statusText;
    } catch (error) {
      dispatch(editarPedidoError());
      alerta("Algo salio mal, revise su red!", "error");
    }
  }
};
//funcion live para quitar de pedidos entregar
export function quitarPedidoDeEntregarAction(pedido, detalles){
  return async (dispatch) => {
    dispatch( quitarPedidoDeEntregar( pedido));
    detalles.forEach(item => {
      dispatch( quitarDetalleDeEntregar(item) );
    });
  }
};
//QUITAR  
const quitarPedidoDeEntregar = (pedido) => ({
  type: QUITAR_PEDIDO_ENTREGAR_LIVE,
  payload: pedido
});

const quitarDetalleDeEntregar = (item) => ({
  type: QUITAR_DETALLE_ENTREGAR_LIVE,
  payload: item
});