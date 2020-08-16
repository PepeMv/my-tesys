import axios from "axios";


const clienteAxios = axios.create({
  baseURL: "52.1.160.159/api",
});

export default clienteAxios;
