import { handleAsync } from "../../utils/handleAsync";
import axiosInstance from "../axiosintercepter";

export const addTime = handleAsync(async (data) => {
  const response = await axiosInstance.post("/counsellor/times", data);
  return response.data;
});
export const getTime = handleAsync(async (data) => {
  const response = await axiosInstance.get("/counsellor/times", data);
  return response.data;
});
export const getSlot = handleAsync(async (id, filter) => {
  const response = await axiosInstance.get(`/user/counseller/${id}/times`, {
    params: filter,
  });
  return response.data;
});
export const counsellorTimeSlot = handleAsync(async (id, filter) => {
  const response = await axiosInstance.get(
    `/counsellor/counsellors/${id}/times`,
    {
      params: filter,
    }
  );
  return response.data;
});
