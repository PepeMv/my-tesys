import axios from "axios";


const clienteAxios = axios.create({
  baseURL: "http://52.1.160.159/api",
});

export default clienteAxios;
