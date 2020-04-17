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

//Redux
import { Provider } from "react-redux";
import store from "./store";
import EditarProducto from "./components/funcionalidad/producto/EditarProducto";
import ConfirmarCompra from "./components/funcionalidad/compra/ConfirmarCompra";


function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* productos */}
          <Route exact path="/productos" component={ProductosContainer} />
          <Route exact path="/productos/nuevo" component={ProductoNuevo} />
          <Route exact path="/productos/edit/:id" component={EditarProducto} />
          {/* Restaurante */}
          <Route exact path="/restaurante" component={Restaurante} />
          {/* categorias */}
          <Route exact path="/categorias" component={CategoriaContainer} />
          <Route exact path="/categorias/nuevo" component={NuevaCategoria} />
          <Route exact path="/categorias/edit/:id" component={EditarCategoria} />
          {/* mesas */}
          <Route exact path="/mesas" component={MesasContainer} />
          <Route exact path="/mesas/nuevo" component={MesaNueva} />
          <Route exact path="/mesas/edit/:id" component={EditarMesa} />
          {/* usuarios */}
          <Route exact path="/usuarios" component={UsuariosContainer} />
          <Route exact path="/usuarios/nuevo" component={UsuarioNuevo} />
          {/* datos factiracion */}
          <Route exact path="/datosFacturacion" component={DatosFacturacionContainer} />
          <Route exact path="/datosFacturacion/nuevo" component={DatosDeFacturacion}/>

          {/* confirmar compra */}
          <Route exact path="/confirmarCompra" component={ConfirmarCompra}/>
          {/* //priuebas */}
          {/* <Route exact path="/aa" component={LocationPicker}/> */}
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
