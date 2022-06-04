import { axiosInstance } from "config/axiosInstance";

export const getFacilities = async () => {
  const response = await axiosInstance.get(`/api/facilities`);
  return response;
};

export const getFacility = async (id) => {
  const response = await axiosInstance.get(`/api/facilities/${id}`);
  return response;
};

export const createFacility = async (data) => {
  const response = await axiosInstance.post(`/api/facilities`, data);
  return response;
};

export const editFacility = async (id, data) => {
  const response = await axiosInstance.put(`/api/facilities/${id}`, data);
  return response;
};

export const deleteFacility = async (id) => {
  const response = await axiosInstance.delete(`/api/facilities/${id}`);
  return response;
};
