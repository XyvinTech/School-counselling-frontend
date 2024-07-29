import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const addEvent = async (data) => {
  try {
    const response = await axiosInstance.post("/admin/event", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};