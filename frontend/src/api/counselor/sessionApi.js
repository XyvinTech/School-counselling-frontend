import { toast } from "react-toastify";
import { handleAsync } from "../../utils/handleAsync";
import axiosInstance from "../axiosintercepter";

export const addSession = async (data) => {
  try {
    const response = await axiosInstance.post("/user/session", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const reschedule = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/user/reschedule/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const getSessionByCase = handleAsync(async (id) => {
  const response = await axiosInstance.get(`/user/sessions/${id}`);

  return response.data;
});
export const getSessionReport = handleAsync(async (id) => {
  const response = await axiosInstance.get(`/user/session/${id}`);

  return response.data;
});

export const acceptSession = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      `/counsellor/accept-session/${id}`,
      data
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const getCounselorSessionReport = handleAsync(async (id) => {
  const response = await axiosInstance.get(`/counsellor/session/${id}`);

  return response.data;
});
export const counselorReschedule = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      `/counsellor/reschedule/${id}`,
      data
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const addEntry = async (id, data) => {
  try {
    const response = await axiosInstance.post(
      `/counsellor/add-entry/${id}`,
      data
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const cancelcounselorSession = async (id) => {
  try {
    const response = await axiosInstance.put(
      `/counsellor/cancel-session/${id}/cancel`
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
