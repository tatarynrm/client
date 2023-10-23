import axios from "axios";
const API_URL = 'http://localhost:8800'
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

// instance.interceptors.response.use(
//  async (config) => {
//   return config;
    
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response.status === 401 &&
//       error.config &&
//       !error.config._isRetry
//     ) {
//       originalRequest._isRetry = true;
//       try {
//         const response = await axios.get(`${API_URL}/refresh`, {
//           withCredentials: true,
//         });
//         localStorage.setItem("token", response.data.accessToken);
//         return axios.request(originalRequest);
//       } catch (error) {
//         console.log("НЕ АВТОРИЗОВАНИЙ КОРИСТУВАЧ");
//         window.localStorage.removeItem('token')
//       }
//     }
//     throw error;
//   }
// );
// instance.defaults.withCredentials = true;
export default instance;
