import { axiosInstance } from "config/axiosInstance";
import { getProfile } from "utils";

export const getComplaints = async () => {
  const response = await axiosInstance.get(`/api/complaints`);
  const user = getProfile();
  let data = response;
  if (user.role === "PENGHUNI") {
    data = response.filter((item) => item.user_id === user.id);
  }
  return data;
};

export const getComplaint = async (id) => {
  const response = await axiosInstance.get(`/api/complaints/${id}`);
  return response;
};

export const createComplaint = async (data) => {
  const response = await axiosInstance.post(`/api/complaints`, data);
  return response;
};

export const editComplaint = async (id, data) => {
  const response = await axiosInstance.put(`/api/complaints/${id}`, data);
  return response;
};

export const deleteComplaint = async (id) => {
  const response = await axiosInstance.delete(`/api/complaints/${id}`);
  return response;
};
