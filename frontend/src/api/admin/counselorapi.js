import { toast } from "react-toastify";
import { handleAsync } from "../../utils/handleAsync";
import axiosInstance from "../axiosintercepter";

export const addCounselor = async (data) => {
  try {
    const response = await axiosInstance.post("/admin/counsellor", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const getUser = handleAsync(async (id) => {
  const response = await axiosInstance.get(`/admin/user/${id}`);

  return response.data;
});
//get all counselors with type
export const fetchCounselor = handleAsync(async (filter) => {
  const response = await axiosInstance.get("/user/counsellors", {
    params: filter,
  });
  return response.data;
});

export const allCounselor = handleAsync(async (filter) => {
  const response = await axiosInstance.get("/counsellor/counsellors", {
    params: filter,
  });
  return response.data;
});
