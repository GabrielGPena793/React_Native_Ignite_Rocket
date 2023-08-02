import { AppError } from "@utils/AppError";
import axios from "axios";

// ip local, pode mudar aos desligar e ligar o PC,
// verificar se o ip local está correto
const api = axios.create({
  baseURL: 'http://192.168.1.17:3333'
})

api.interceptors.response.use(
  response => response, 
  error => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      return Promise.reject(error)
    }
})



export { api } 