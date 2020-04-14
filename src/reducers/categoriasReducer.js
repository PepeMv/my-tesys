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

//cada reducer tiene su propio state
const initialState = {
  listadoCategorias: [],
  error: null,
  loading: false,
  categoriaEliminar: null,
  categoriaEditar: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMENZAR_CATEGORIA_EDITAR:
    case COMENZAR_DESCARGA_CATEGORIAS:
    case AGREGAR_CATEGORIA:
      return {
        ...state,
        loading: action.payload,
      };
    case AGREGAR_CATEGORIA_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        listadoCategorias: [...state.listadoCategorias, action.payload],
      };
    case EDITAR_CATEGORIA_ERROR:
    case ELIMINAR_CATEGORIA_ERROR:
    case DESCARGAR_CATEGORIAS_ERROR:
    case AGREGAR_CATEGORIA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DESCARGAR_CATEGORIAS_EXITO:
      return {
        ...state,
        loading: false,
        listadoCategorias: action.payload,
      };
    case OBTENER_CATEGORIA_ELIMINAR:
      return {
        ...state,
        loading: true,
        categoriaEliminar: action.payload,
      };
    case ELIMINAR_CATEGORIA_EXITO:
      return {
        ...state,
        listadoCategorias: state.listadoCategorias.filter(
          (categoria) => categoria.id !== state.categoriaEliminar
        ),
        categoriaEliminar: null,
        loading: false,
        error: null
      };
    case OBTENER_CATEGORIA_EDITAR:
      return {
        ...state,
        categoriaEditar: action.payload,
      };
    case EDITAR_CATEGORIA_EXITO:
      return {
        ...state,
        categoriaEditar: null,
        listadoCategorias: state.listadoCategorias.map((categoria) =>
          categoria.id === action.payload.id
            ? (categoria = action.payload)
            : categoria
        ),
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
