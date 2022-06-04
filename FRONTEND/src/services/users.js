import { axiosInstance } from "config/axiosInstance";

export const login = async (data) => {
  const response = await axiosInstance.post(`/api/users/login`, data);
  return response;
};

export const getUsers = async () => {
  const response = await axiosInstance.get(`/api/users`);
  return response;
};

export const getUser = async (id) => {
  const response = await axiosInstance.get(`/api/users/${id}`);
  return response;
};

export const createUser = async (data) => {
  const response = await axiosInstance.post(`/api/users/register`, data);
  return response;
};

export const changePassword = async (data) => {
  const response = await axiosInstance.put(`/api/users/change-password`, data);
  return response;
};

export const editUser = async (id, data) => {
  const response = await axiosInstance.put(`/api/users/${id}`, data);
  return response;
};

export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/api/users/${id}`);
  return response;
};
