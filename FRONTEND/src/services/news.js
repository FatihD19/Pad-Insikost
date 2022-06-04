import { axiosInstance } from "config/axiosInstance";

export const getAllNews = async () => {
  const response = await axiosInstance.get(`/api/news`);
  return response;
};

export const getNews = async (id) => {
  const response = await axiosInstance.get(`/api/news/${id}`);
  return response;
};

export const createNews = async (data) => {
  const response = await axiosInstance.post(`/api/news`, data);
  return response;
};

export const editNews = async (id, data) => {
  const response = await axiosInstance.put(`/api/news/${id}`, data);
  return response;
};

export const deleteNews = async (id) => {
  const response = await axiosInstance.delete(`/api/news/${id}`);
  return response;
};

export const sendNews = async (id) => {
  const response = await axiosInstance.post(`/api/news/${id}/send`);
  return response;
};
