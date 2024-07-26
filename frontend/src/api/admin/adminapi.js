import axios from "axios";
import axiosInstance from "../axiosintercepter";
import { toast } from "react-toastify";
const baseURL = "http://52.66.173.34:3000/api/v1/";
export const getLogin = async (datas) => {
  try {
    const response = await axios.post(`${baseURL}admin/login`, datas);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const getUser = async () => {
  try {
    const response = await axiosInstance.get("/admin");
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
