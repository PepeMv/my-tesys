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
  AGREGAR_DETALLE_STATE,
} from "./../types";

const initialState = {
  token: localStorage.getItem("reTomasToken"),
  autenticado: null,
  usuarioInfo: null,
  datosFacturacion: [],
  pedidos: [],
  detalles: [],
  mensaje: null,
  loading: false,
  cargando: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_EXITOSO:
      localStorage.setItem("reTomasToken", action.payload);
      return {
        ...state,
        autenticado: true,
        mensaje: null,
        token: action.payload,
        cargando: false,
      };
    case LOGIN_ERROR:
      localStorage.removeItem("reTomasToken");
      return {
        ...state,
        token: null,
        mensaje: action.payload,
        cargando: false,
      };
    case OBTENER_USUARIO:
      return {
        ...state,
        loading: action.payload,
        cargando: false,
      };
    case OBTENER_USUARIO_EXITO:
      return {
        ...state,
        loading: false,
        usuarioInfo: action.payload,
        mensaje: null,
        autenticado: true,
      };
    case EDITAR_USUARIO_ERROR:
    case OBTENER_USUARIO_ERROR:
      return {
        ...state,
        //mensaje: "No se obtuvo el usuario",
        loading: false,
      };
    case CERRAR_SESION:
      localStorage.removeItem("reTomasToken");
      return {
        ...state,
        token: null,
        autenticado: null,
        usuarioInfo: null,
        mensaje: null,
        datosFacturacion: [],
        pedidos: [],
        detalles: [],
      };
    case COMENZAR_DESCARGA_PEDIDOS_USUARIO:
    case COMENZAR_USUARIO_EDITAR:
    case COMENZAR_INSERTAR_DATOSFACTURACION:
    case COMENZAR_DESCARGA_DATOSFACTURACION:
      return {
        ...state,
        loading: action.payload,
      };
    case DESCARGA_DATOSFACTURACION_EXITO:
      return {
        ...state,
        loading: false,
        datosFacturacion: action.payload,
      };
    case DESCARGA_PEDIDOS_USUARIO_ERROR:
    case INSERTAR_DATOSFACTURACION_ERROR:
    case DESCARGA_DATOSFACTURACION_ERROR:
      return {
        ...state,
        loading: false,
        mensaje: "Algo salio mal intente nuevamente!",
      };
    case INSERTAR_DATOSFACTURACION_EXITO:
      return {
        ...state,
        loading: false,
        mensaje: null,
        datosFacturacion: [...state.datosFacturacion, action.payload],
      };
    case EDITAR_USUARIO_EXITO:
      return {
        ...state,
        loading: false,
        mensaje: null,
        usuarioInfo: action.payload,
      };
    case DESCARGA_PEDIDOS_USUARIO_EXITO:
      return {
        ...state,
        loading: false,
        mensaje: null,
        pedidos: action.payload.pedidos,
        detalles: action.payload.detalles,
      };
    case AGREGAR_PEDIDO_STATE:
      return {
        ...state,
        pedidos: [...state.pedidos, action.payload],
      };
    case AGREGAR_DETALLE_STATE:
      return {
        ...state,
        detalles: [...state.detalles, action.payload],
      };
    default:
      return state;
  }
}
