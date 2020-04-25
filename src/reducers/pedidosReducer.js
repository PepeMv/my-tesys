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
} from "../types";

//cada reducer tiene su propio state
const initialState = {
  pedidosGenerales: [],
  detallesGenerales: [],
  pedidosParaPreparar: [],
  detallesParaPreparar: [],
  pedidosParaEntregar: [],
  detallesParaEntregar: [],
  numeroItems: 0,
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case OBTENER_NUMERO_ITEMS_PEDIDO:
      return {
        ...state,
        numeroItems: action.payload,
      };
    case COMENZAR_EDITAR_PEDIDO:
    case COMENZAR_DESCARGA_PEDIDOS_ENTREGAR:
    case COMENZAR_DESCARGA_TODOS_PEDIDOS:
    case COMENZAR_DESCARGA_PEDIDOS_PREPARAR:
    case COMENZAR_AGREGAR_PEDIDO:
      return {
        ...state,
        loading: action.payload,
      };
    case AGREGAR_PEDIDO_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        pedidosGenerales: [...state.pedidosGenerales, action.payload.pedido],
      };
    case EDITAR_PEDIDO_ERROR:
    case DESCARGA_PEDIDOS_ENTREGAR_ERROR:
    case DESCARGA_TODOS_PEDIDOS_ERROR:
    case DESCARGA_PEDIDOS_PREPARAR_ERROR:
    case AGREGAR_PEDIDO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DESCARGA_PEDIDOS_PREPARAR_EXITO:
      return {
        ...state,
        pedidosParaPreparar: action.payload.pedidos,
        detallesParaPreparar: action.payload.detalles,
        loading: false,
        error: null,
      };
    case DESCARGA_PEDIDOS_ENTREGAR_EXITO:
      return {
        ...state,
        pedidosParaEntregar: action.payload.pedidos,
        detallesParaEntregar: action.payload.detalles,
        loading: false,
        error: null,
      };
    case AGREGAR_PEDIDO_LIVE:
      return {
        ...state,
        pedidosParaPreparar: [...state.pedidosParaPreparar, action.payload],
      };
    case AGREGAR_DETALLE_LIVE:
      return {
        ...state,
        detallesParaPreparar: [...state.detallesParaPreparar, action.payload],
      };
    case AGREGAR_PEDIDO_ENTREGAR_LIVE:
      return {
        ...state,
        //primero elimino de pedidos preparar
        pedidosParaPreparar: state.pedidosParaPreparar.filter(
          (pedido) => pedido.id !== action.payload.id
        ),
        //agrego el pedido a pedidos entregar
        pedidosParaEntregar: [...state.pedidosParaEntregar, action.payload],
      };
    case AGREGAR_DETALLE_ENTREGAR_LIVE:
      return {
        ...state,
        //elimino el detalle de detalles preparar
        detallesParaPreparar: state.detallesParaPreparar.filter(
          (detalle) => detalle.id !== action.payload.id
        ),
        //agrego el deatlle a detalles entregar
        detallesParaEntregar: [...state.detallesParaEntregar, action.payload],
      };
    case DESCARGA_TODOS_PEDIDOS_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        pedidosGenerales: action.payload.pedidos,
        detallesGenerales: action.payload.detalles,
      };
    case EDITAR_PEDIDO_EXITO:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
