import React from "react";
import Header from "./components/layout/Header";
import AppFrame from "./components/layout/AppFrame";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ProductosContainer from './components/funcionalidad/producto/ProductosContainer';
import Tabla from "./components/layout/Tabla";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/"component = {ProductosContainer} />
      </Switch>      
    </Router>
  );
}

export default App;
