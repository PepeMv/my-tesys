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
  EDITAR_MESA_ERROR,
} from "./../types";

const initialState = {
  listadoMesas: [],
  error: null,
  loading: false,
  mesaEliminar: null,
  mesaEditar: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMENZAR_MESA_EDITAR:
    case COMENZAR_DESCARGA_MESAS:
    case AGREGAR_MESA:
      return {
        ...state,
        loading: action.payload,
      };
    case AGREGAR_MESA_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        listadoMesas: [...state.listadoMesas, action.payload],
      };
    case EDITAR_MESA_ERROR:
    case ELIMINAR_MESA_ERROR:
    case DESCARGAR_MESAS_ERROR:
    case AGREGAR_MESA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DESCARGAR_MESAS_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        listadoMesas: action.payload,
      };
    case OBTENER_MESA_ELIMINAR:
      return {
        ...state,
        loading: true,
        mesaEliminar: action.payload,
      };
    case ELIMINAR_MESA_EXITO:
      return {
        ...state,
        listadoMesas: state.listadoMesas.filter(
          (mesa) => mesa.id !== state.mesaEliminar
        ),
        mesaEliminar: null,
        loading: false,
        error: null,
      };
    case OBTENER_MESA_EDITAR:
      return {
        ...state,
        mesaEditar: action.payload,
      };
    case EDITAR_MESA_EXITO:
      return {
        ...state,
        mesaEditar: null,
        listadoMesas: state.listadoMesas.map((mesa) =>
          mesa.id === action.payload.id ? (mesa = action.payload) : mesa
        ),
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
