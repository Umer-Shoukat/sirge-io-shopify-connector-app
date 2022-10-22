import axios from "axios";
import { API_END_POINT, AUTH_KEY } from "../config";

const axiosInstance = axios.create({
  baseURL: API_END_POINT,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Key = AUTH_KEY;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
