import React from "react";
import Header from "./components/layout/Header";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Restaurante from "./components/funcionalidad/restaurante/Restaurante";
import ProductosContainer from "./components/funcionalidad/producto/ProductosContainer";



function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/"component = {Restaurante} />
        {/* productos */}
        <Route exact path="/productos"component = {ProductosContainer} />
        <Route exact path="/restaurante"component = {Restaurante} />
      </Switch>      
    </Router>
  );
}

export default App;
