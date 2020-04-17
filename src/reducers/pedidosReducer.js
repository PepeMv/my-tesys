import {
  OBTENER_NUMERO_ITEMS_PEDIDO,
  COMENZAR_AGREGAR_PEDIDO,
  AGREGAR_PEDIDO_EXITO,
  AGREGAR_PEDIDO_ERROR,
} from "../types";

//cada reducer tiene su propio state
const initialState = {
  pedidosDelUsuario: [],
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
        pedidosDelUsuario: [...state.pedidosDelUsuario, action.payload.pedido],
      };
    case AGREGAR_PEDIDO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
