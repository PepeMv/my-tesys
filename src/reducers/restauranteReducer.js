import {
  COMENZAR_DESCARGA_RESTAURANTE,
  DESCARGA_RESTAURANTE_EXITO,
  DESCARGA_RESTAURANTE_ERROR,
  ACTUALIZAR_RESTAURANTE,
  ACTUALIZAR_RESTAURANTE_EXITO,
  ACTUALIZAR_RESTAURANTE_ERROR,
} from "./../types";

//cada reducer tiene su propio state
const initialState = {
  restauranteInfo: {},
  imagenes: {},
  editandoRestaurante: false,
  error: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_RESTAURANTE:
      return {
        ...state,
        loading: action.payload,
      };
    case DESCARGA_RESTAURANTE_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        restauranteInfo: action.payload.data,
        imagenes: action.payload.imagenes,
      };
    case ACTUALIZAR_RESTAURANTE_ERROR:
    case DESCARGA_RESTAURANTE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ACTUALIZAR_RESTAURANTE:
      return {
        ...state,
        loading: true,
        editandoRestaurante: action.payload
      };
    case ACTUALIZAR_RESTAURANTE_EXITO:
      return {
        ...state,
        restauranteInfo: action.payload.data,
        imagenes: action.payload.imagenes,
        editandoRestaurante: false,
        loading: false,
        error:null
      };
         
    default:
      return state;
  }
}
