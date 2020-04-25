import React from "react";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Restaurante from "./components/funcionalidad/restaurante/Restaurante";
import ProductosContainer from "./components/funcionalidad/producto/ProductosContainer";
import CategoriaContainer from "./components/funcionalidad/categoria/CategoriaContainer";
import NuevaCategoria from "./components/funcionalidad/categoria/NuevaCategoria";
import EditarMesa from "./components/funcionalidad/mesa/EditarMesa";
import MesasContainer from "./components/funcionalidad/mesa/MesasContainer";
import MesaNueva from "./components/funcionalidad/mesa/MesaNueva";
import ProductoNuevo from "./components/funcionalidad/producto/ProductoNuevo";
import UsuariosContainer from "./components/funcionalidad/usuario/UsuariosContainer";
import UsuarioNuevo from "./components/funcionalidad/usuario/UsuarioNuevo";
import Home from "./components/funcionalidad/home/Home";
import DatosDeFacturacion from "./components/funcionalidad/usuario/DatosDeFacturacion";
import DatosFacturacionContainer from "./components/funcionalidad/usuario/DatosFacturacionContainer";
import EditarCategoria from "./components/funcionalidad/categoria/EditarCategoria";
import RutaPrivada from './components/rutas/RutaPrivada';
//Redux
import { Provider } from "react-redux";
import store from "./store";
import EditarProducto from "./components/funcionalidad/producto/EditarProducto";
import ConfirmarCompra from "./components/funcionalidad/compra/ConfirmarCompra";
import MostrarOrdenesLive from "./components/funcionalidad/ordenes/MostrarOrdenesLive";
import Listener from "./components/layout/Listener";
import EditarUsuario from "./components/funcionalidad/usuario/EditarUsuario";
import tokenAuth from './config/tokenAuth';
import MiPerfil from "./components/funcionalidad/usuario/MiPerfil";
import MisPedidos from "./components/funcionalidad/usuario/MisPedidos";
import OrdenesContainer from "./components/funcionalidad/ordenes/OrdenesContainer";
import MostrarOrdenesEntregar from "./components/funcionalidad/ordenes/MostrarOrdenesEntregar";
//
//tratar de logear si tengo un token
const token = localStorage.getItem('reTomasToken');
if(token){
  tokenAuth(token);
}


function App() {  
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <Listener />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* productos */}
          <RutaPrivada exact path="/productos" component={ProductosContainer} />
          <RutaPrivada exact path="/productos/nuevo" component={ProductoNuevo} />
          <RutaPrivada exact path="/productos/edit/:id" component={EditarProducto} />
          {/* Restaurante */}
          <RutaPrivada exact path="/restaurante" component={Restaurante} />
          {/* categorias */}
          <RutaPrivada exact path="/categorias" component={CategoriaContainer} />
          <RutaPrivada exact path="/categorias/nuevo" component={NuevaCategoria} />
          <RutaPrivada exact path="/categorias/edit/:id" component={EditarCategoria} />
          {/* mesas */}
          <RutaPrivada exact path="/mesas" component={MesasContainer} />
          <RutaPrivada exact path="/mesas/nuevo" component={MesaNueva} />
          <RutaPrivada exact path="/mesas/edit/:id" component={EditarMesa} />
          {/* usuarios */}
          <RutaPrivada exact path="/usuarios" component={UsuariosContainer} />
          <RutaPrivada exact path="/usuarios/nuevo" component={UsuarioNuevo} />
          <RutaPrivada exact path="/usuarios/edit/:od" component={EditarUsuario} />
          {/* datos factiracion */}
          <RutaPrivada exact path="/datosFacturacion" component={DatosFacturacionContainer} />
          <RutaPrivada exact path="/datosFacturacion/nuevo" component={DatosDeFacturacion}/>
          
          <RutaPrivada exact path="/miPerfil" component={MiPerfil}/>
          <RutaPrivada exact path="/misPedidos" component={MisPedidos}/>
          <RutaPrivada exact path="/pedidos/buscarPedidos" component={OrdenesContainer}/>

          {/* confirmar compra */}
          <RutaPrivada exact path="/confirmarCompra" component={ConfirmarCompra}/>

          {/* Ver pedidos para preparar */}
          <RutaPrivada exact path="/pedidos/pedidosPreparar" component={MostrarOrdenesLive}/>
          <RutaPrivada exact path="/pedidos/pedidosEntregar" component={MostrarOrdenesEntregar}/>
          {/* //priuebas */}
          {/* <Route exact path="/aa" component={LocationPicker}/> */}

        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
