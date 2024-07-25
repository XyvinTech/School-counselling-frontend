import { handleAsync } from "../../utils/handleAsync";
import axiosInstance from "../axiosintercepter";

export const addSession = handleAsync(async (data) => {
  const response = await axiosInstance.post("/user/session", data);
  return response.data;
});
export const reschedule = handleAsync(async (id, data) => {
  const response = await axiosInstance.put(`/user/reschedule/${id}`, data);
  return response.data;
});
export const getSessionByCase = handleAsync(async (id) => {
  const response = await axiosInstance.get(`/user/sessions/${id}`);

  return response.data;
});
export const getSessionReport = handleAsync(async (id) => {
  const response = await axiosInstance.get(`/user/session/${id}`);

  return response.data;
});

export const acceptSession = handleAsync(async (id, data) => {
  const response = await axiosInstance.put(
    `/counsellor/accept-session/${id}`,
    data
  );
  return response.data;
});
export const getCounselorSessionReport = handleAsync(async (id) => {
  const response = await axiosInstance.get(`/counsellor/session/${id}`);

  return response.data;
});
export const counselorReschedule = handleAsync(async (id, data) => {
  const response = await axiosInstance.put(
    `/counsellor/reschedule/${id}`,
    data
  );
  return response.data;
});
