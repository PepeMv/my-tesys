import {
  INICIAR_REGISTRO_USUARIO,
  REGISTRO_USUARIO_EXITOSO,
  REGISTRO_USUARIO_ERROR,  
  COMENZAR_DESCARGA_USUARIOS,
  DESCARGA_USUARIIOS_EXITO,
  DESCARGA_USUARIIOS_ERROR,
  OBTENER_USUARIO_EDITAR,
  COMENZAR_USUARIO_EDITAR,
  EDITAR_USUARIO_EXITO,
  EDITAR_USUARIO_ERROR,
} from "./../types";

const initialState = {
  listadoUsuarios: [],
  /* token: localStorage.getItem("reTomasToken"),
  autenticado: null,
  usuarioInfo: null,
  mensaje: null, */
  loading: false,
  error: null,
  usuarioEditar: null,
  usuarioEliminar: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMENZAR_USUARIO_EDITAR:
    case COMENZAR_DESCARGA_USUARIOS:
    case INICIAR_REGISTRO_USUARIO:
      return {
        ...state,
        loading: action.payload,
      };
    case REGISTRO_USUARIO_EXITOSO:
      return {
        ...state,
        loading: false,
        error: null,
        listadoUsuarios: [...state.listadoUsuarios, action.payload],
      };
    case EDITAR_USUARIO_ERROR:
    case DESCARGA_USUARIIOS_ERROR:
    case REGISTRO_USUARIO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DESCARGA_USUARIIOS_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        listadoUsuarios: action.payload,
      };
    case OBTENER_USUARIO_EDITAR:
      return {
        ...state,
        usuarioEditar: action.payload,
      };
    case EDITAR_USUARIO_EXITO:
      return {
        ...state,
        usuarioEditar: null,
        loading: false,
        error: null,
        listadoUsuarios: state.listadoUsuarios.map((usuario) =>
          usuario.id === action.payload.id
            ? (usuario = action.payload)
            : usuario
        ),
      };
    default:
      return state;
  }
}
