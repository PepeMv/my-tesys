import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'http://192.168.1.10:8000/api'
});

export default clienteAxios;