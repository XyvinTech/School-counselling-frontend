import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api-counselling.xpensea.com/api/v1/",
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
