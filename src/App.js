import React from "react";
import Header from "./components/layout/Header";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Restaurante from "./components/funcionalidad/restaurante/Restaurante";
import ProductosContainer from "./components/funcionalidad/producto/ProductosContainer";
import CategoriaContainer from "./components/funcionalidad/categoria/CategoriaContainer";
import NuevaCategoria from "./components/funcionalidad/categoria/NuevaCategoria";
import MesasContainer from "./components/funcionalidad/mesa/MesasContainer";
import MesaNueva from "./components/funcionalidad/mesa/MesaNueva";



function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/"component = {MesaNueva} />
        {/* productos */}
        <Route exact path="/productos"component = {ProductosContainer} />
        <Route exact path="/restaurante"component = {Restaurante} />
      </Switch>      
    </Router>
  );
}

export default App;
