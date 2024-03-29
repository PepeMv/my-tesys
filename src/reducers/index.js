import {combineReducers} from 'redux';
import restauranteReducer from './restauranteReducer';
import categoriasReducer from './categoriasReducer';
import productosReducer from './productosReducer';
import mesasReducer from './mesasReducer';
import pedidosReducer from './pedidosReducer';
import usuarioReducer from './usuarioReducer';
import logeoReducer from './logeoReducer';

export default combineReducers ({
    restaurante: restauranteReducer,
    categorias: categoriasReducer,
    productos: productosReducer,
    mesas: mesasReducer,
    pedidos: pedidosReducer,
    usuario: usuarioReducer,
    logeo: logeoReducer,
});