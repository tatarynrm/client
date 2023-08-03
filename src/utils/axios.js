import axios from "axios";
const instance = axios.create({
  // baseURL: "http://192.168.5.180:8800",
    // baseURL: "http://localhost:8800",
  baseURL: "https://api.ict.lviv.ua",
  // .

});
// this is comment
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});
export default instance;
