
import axios from "axios";
import axiosInstance from "../axiosintercepter";

const baseURL = "http://52.66.173.34:3000/api/v1/";
export const getLogin = async (datas) => {
  try {
    const response = await axios.post(`${baseURL}user/login`, datas);
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};

