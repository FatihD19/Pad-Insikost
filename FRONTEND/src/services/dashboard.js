import { axiosInstance } from "config/axiosInstance";

export const getCharts = async () => {
  const response = await axiosInstance.get(`/api/dashboard/charts`);
  return response;
};
