import { axiosInstance } from "config/axiosInstance";

export const uploadPhoto = async (data) => {
  const response = await axiosInstance.post(`/api/services/upload-photo`, data);
  return response;
};
