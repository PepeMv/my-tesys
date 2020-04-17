import { 
  OBTENER_NUMERO_ITEMS_PEDIDO, 
  COMENZAR_AGREGAR_PEDIDO, 
  AGREGAR_PEDIDO_EXITO,
  AGREGAR_PEDIDO_ERROR
} from "./../types";
import clienteAxios from "../config/axios";
import { alerta, alertaConfirmacion } from "./../components/layout/AlertaCRUD";
import { useHistory } from "react-router-dom";


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
    /* console.log(total);
    console.log(subtotal);
    console.log(tipoPedido);
    console.log(usuario);
    console.log(datosFacturacion);
    console.log(productos);
    console.log(extra); */
    
    dispatch( empezarInsertarPedido() );
    let formData = new FormData();
    formData.append('idUsuario', usuario.id );
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