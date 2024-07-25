import axios from "axios";
import axiosInstance from "../axiosintercepter";

const baseURL = "http://52.66.173.34:3000/api/v1/";
export const getLogin = async (datas) => {
  try {
    const response = await axios.post(`${baseURL}counsellor/login`, datas);
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
export const getCounselor = async () => {
  try {
    const response = await axiosInstance.get("/counsellor");
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
