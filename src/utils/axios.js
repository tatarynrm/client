import axios from "axios";
const instance = axios.create({
  // baseURL: "http://localhost:8800",
  baseURL: "http://192.168.5.180:8800",
  // baseURL: "http://ict.lviv.ua/api",
  // baseURL: "http://api.ict.lviv.ua",
  // baseURL: "http://api.ict.lviv.ua",
  // baseURL: "http://0.0.0.0:8800",
  // ..
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
    'Content-Type': 'application/json'
  },
});
// this is comment
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});
export default instance;
