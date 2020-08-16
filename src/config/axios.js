import axios from "axios";


const clienteAxios = axios.create({
  baseURL: "https://52.1.160.159/api",
  headers: {'Access-Control-Allow-Origin' : "*"}
});

export default clienteAxios;
