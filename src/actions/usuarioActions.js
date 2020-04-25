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
  EDITAR_USUARIO_ERROR
} from "./../types";

import { alerta } from "./../components/layout/AlertaCRUD";
import clienteAxios from "./../config/axios";

export function registrarUsuarioAction(usuario) {
  return async (dispatch) => {
    dispatch(iniciarregistrarUsuario());

    let formData = new FormData();
    formData.append("nombre", usuario.nombre);
    formData.append("apellido", usuario.apellido);
    formData.append("tipoDocumento", usuario.tipoDocumento);
    formData.append("numeroDocumento", usuario.numeroDocumento);
    formData.append("email", usuario.email);
    formData.append("password", usuario.password);
    formData.append("telefono", usuario.telefono);
    formData.append("direccion", usuario.direccion);
    if (usuario.tipoUsuario === "") {
      formData.append("tipoUsuario", "cliente");
    } else {
      formData.append("tipoUsuario", usuario.tipoUsuario);
    }

    try {
      const respuesta = await clienteAxios.post("/usuario/registrar", formData);
      //console.log(respuesta);
      if (respuesta.data.HttpResponse.statusText === "success") {
        dispatch(registrarUsuarioExito(respuesta.data.usuario));
        //console.log(respuesta.data.categoria);
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      } else {
        dispatch(registrarUsuarioError(respuesta.data.HttpResponse.message));
        alerta(
          respuesta.data.HttpResponse.message,
          respuesta.data.HttpResponse.statusText
        );
      }
      return respuesta.data.HttpResponse.statusText;
    } catch (error) {
      dispatch(registrarUsuarioError());
      alerta("Algo salio mal, revise su red!", "error");
      return "error";
    }
  };
}

const iniciarregistrarUsuario = () => ({
  type: INICIAR_REGISTRO_USUARIO,
  payload: true,
});
//registro usuario exito
const registrarUsuarioExito = (usuario) => ({
  type: REGISTRO_USUARIO_EXITOSO,
  payload: usuario,
});
//registrar usuario error
const registrarUsuarioError = (mensaje) => ({
  type: REGISTRO_USUARIO_ERROR,
  payload: mensaje,
});


//descragar usuarios solo en la pantalla de administracion de usuarios
export function obtenerUsuariosAction() {
    return async (dispatch) => {
        dispatch( comenzarObtenerUsuarios());
  
        try {
          const respuesta = await clienteAxios.get("/usuarios");
          //console.log(respuesta.data);
          dispatch( descargaUsuariosExito( respuesta.data.usuarios) );
        } catch (error) {
            dispatch( descargaUsuariosError());
        }
    };
}
//COMENZAR DESCARGA USUARIOS
const comenzarObtenerUsuarios = () => ({
    type: COMENZAR_DESCARGA_USUARIOS,
    payload: true
});
//descraga usuarios exito
const descargaUsuariosExito = (usuarios) => ({
    type: DESCARGA_USUARIIOS_EXITO,
    payload: usuarios
});
//descraga usuarioserror
const descargaUsuariosError = () => ({
    type: DESCARGA_USUARIIOS_ERROR,
    payload: true
});

//editar usuario
export function obtenerUsuarioEditarAction ( usuario ){
  return (dispatch) => {
    dispatch( obtenerUsuarioEditar( usuario ));
  };
}
//obetenr categoria
const obtenerUsuarioEditar = ( usuario ) => ({
  type: OBTENER_USUARIO_EDITAR,
  payload: usuario
});

//comenzar a editar
export function editarUsuarioAction ( usuario){
  return async (dispatch) => {
    dispatch( comenzarEditarUsuario());

    try {
      const respuesta = await clienteAxios.put(`/usuarios/${usuario.id}`, usuario);
      if (respuesta.data.HttpResponse.statusText === "success") {        
        dispatch( editarUsuarioExito(respuesta.data.usuario) );
        alerta(respuesta.data.HttpResponse.message,respuesta.data.HttpResponse.statusText);        
      } else {        
        dispatch( editarUsuarioError() );
        alerta(respuesta.data.HttpResponse.message,respuesta.data.HttpResponse.statusText);
      }
      //return respuesta.data.HttpResponse.statusText;
    } catch (error) {
      dispatch( editarUsuarioError() );
        alerta('Algo salio mal, revise su red!','error');
    }    
  };
}
//comenzar editar
const comenzarEditarUsuario = () => ({
  type: COMENZAR_USUARIO_EDITAR,
  payload: true
});
//ediatr usuario exito
const editarUsuarioExito = (usuario) => ({
  type: EDITAR_USUARIO_EXITO,
  payload: usuario
});
//editar usuario error
const editarUsuarioError = () => ({
  type: EDITAR_USUARIO_ERROR,
  payload: true
});