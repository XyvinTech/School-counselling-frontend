import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://52.66.173.34:3000/api/v1/",
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log('.message',error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
