import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
//import { getUsuarioAutenticado } from "../../actions/logeoActions";

const RutaPrivada = ({ component: Component, ...props }) => {

  const autenticado = useSelector((state) => state.logeo.autenticado);
  const cargando = useSelector((state) => state.logeo.cargando);
  //const perfil = useSelector((state) => state.logeo.usuarioInfo);
 

  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado && !cargando  ?(
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RutaPrivada;
