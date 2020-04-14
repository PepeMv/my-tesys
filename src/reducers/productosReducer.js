import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGAR_PRODUCTOS_EXITO,
  DESCARGAR_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  ELIMINAR_PRODUCTO_EXITO,
  ELIMINAR_PRODUCTO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  EDITAR_PRODUCTO_EXITO,
} from "./../types";

const initialState = {
  listadoProductos: [],
  imagenes: {},
  error: null,
  loading: false,
  productoEliminar: null,
  productoEditar: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_PRODUCTOS:
    case AGREGAR_PRODUCTO:
      return {
        ...state,
        loading: action.payload,
      };
    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        listadoProductos: [...state.listadoProductos, action.payload.producto],
        imagenes: [...state.imagenes, action.payload.imagen],
      };
    case ELIMINAR_PRODUCTO_ERROR:
    case DESCARGAR_PRODUCTOS_ERROR:
    case AGREGAR_PRODUCTO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DESCARGAR_PRODUCTOS_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        listadoProductos: action.payload.productos,
        imagenes: action.payload.imagenes,
      };
    case OBTENER_PRODUCTO_ELIMINAR:
      return {
        ...state,
        loading: true,
        productoEliminar: action.payload,
      };
    case ELIMINAR_PRODUCTO_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        listadoProductos: state.listadoProductos.filter(
          (producto) => producto.id !== state.productoEliminar
        ),
        productoEliminar: null,
      };
      case OBTENER_PRODUCTO_EDITAR:
        return {
          ...state,
          productoEditar: action.payload
        };
     case EDITAR_PRODUCTO_EXITO:
       return {
         ...state,
         productoEditar: null,
         loading: false,
         error: null,
         listadoProductos: state.listadoProductos.map( producto =>
          producto.id === action.payload.producto.id ? producto = action.payload.producto : producto ),
         imagenes: state.imagenes.map( imagen => imagen.id === action.payload.producto.id ? imagen = action.payload.imagen : imagen) 
       };
    default:
      return state;
  }
}
