import {
  COMENZAR_DESCARGA_RESTAURANTE,
  DESCARGA_RESTAURANTE_EXITO,
  DESCARGA_RESTAURANTE_ERROR,
  ACTUALIZAR_RESTAURANTE,
  ACTUALIZAR_RESTAURANTE_EXITO,
  ACTUALIZAR_RESTAURANTE_ERROR,
} from "./../types";
import {alerta} from './../components/layout/AlertaCRUD';
import clienteAxios from "./../config/axios";

//funcion para descargar los producto
export function obtenerRestauranteAction() {
  return async (dispatch) => {
    dispatch(descargarDatosRestaurante());

    try {
      const respuesta = await clienteAxios.get("/restaurante");
      //console.log(respuesta.data);
      dispatch(descargaRestauranteExitosa(respuesta.data));
    } catch (error) {
      dispatch(descargaRestauranteError());
    }
  };
}

const descargarDatosRestaurante = () => ({
  type: COMENZAR_DESCARGA_RESTAURANTE,
  payload: true,
});

const descargaRestauranteExitosa = (restaurante) => ({
  type: DESCARGA_RESTAURANTE_EXITO,
  payload: restaurante,
});

const descargaRestauranteError = () => ({
  type: DESCARGA_RESTAURANTE_ERROR,
  payload: true,
});

//editar restaurante
export function editarRestauranteAction(restaurante) {
  return async (dispatch) => {
    //console.log(restaurante);
    dispatch ( comenzarEditarRestaurante());
    let formData = new FormData();
    formData.append("nombre", restaurante.nombre);
    formData.append("logo", restaurante.logo);
    formData.append("img1", restaurante.img1);
    formData.append("img2", restaurante.img2);
    formData.append("img3", restaurante.img3);
    formData.append("img4", restaurante.img4);
    formData.append("iva", restaurante.iva);
    formData.append("estado", restaurante.estado);
    try {
      const respuesta = await clienteAxios.post(
        `/restaurante/update/${restaurante.id}`,
        formData
      );
      //console.log(respuesta);
      if (respuesta.data.HttpResponse.statusText === "success") {        
        dispatch( editarRestauranteExito(respuesta.data) );
        alerta(respuesta.data.HttpResponse.message,respuesta.data.HttpResponse.statusText);
      } else {        
        dispatch( editarRestauranteError() );
        alerta(respuesta.data.HttpResponse.message,respuesta.data.HttpResponse.statusText);
      }
    } catch (error) {
        dispatch( editarRestauranteError() );
        alerta('Algo salio mal, revise su red!','error');
    }
  };
}

// comenzar a esditar el restaurante
const comenzarEditarRestaurante = () =>({
    type: ACTUALIZAR_RESTAURANTE,
    payload: true
});

//editar producto exito 
const editarRestauranteExito = (restaurante) => ({
    type: ACTUALIZAR_RESTAURANTE_EXITO, 
    payload: restaurante
});

//editar restaurante error
const editarRestauranteError = () => ({
    type: ACTUALIZAR_RESTAURANTE_ERROR,
    payload: true
});
