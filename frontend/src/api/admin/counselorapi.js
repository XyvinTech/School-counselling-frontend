import { handleAsync } from "../../utils/handleAsync";
import axiosInstance from "../axiosintercepter";

export const addCounselor = handleAsync(async (data) => {
  const response = await axiosInstance.post("/admin/counsellor", data);
  return response.data;
});
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
