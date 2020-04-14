import {combineReducers} from 'redux';
import restauranteReducer from './restauranteReducer';
import categoriasReducer from './categoriasReducer';
import productosReducer from './productosReducer';

export default combineReducers ({
    restaurante: restauranteReducer,
    categorias: categoriasReducer,
    productos: productosReducer,
    
});