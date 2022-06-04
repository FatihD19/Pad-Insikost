import { axiosInstance } from "config/axiosInstance";

export const getRooms = async () => {
  const response = await axiosInstance.get(`/api/rooms`);
  return response;
};

export const getRoom = async (id) => {
  const response = await axiosInstance.get(`/api/rooms/${id}`);
  return response;
};

export const createRoom = async (data) => {
  const response = await axiosInstance.post(`/api/rooms`, data);
  return response;
};

export const editRoom = async (id, data) => {
  const response = await axiosInstance.put(`/api/rooms/${id}`, data);
  return response;
};

export const deleteRoom = async (id) => {
  const response = await axiosInstance.delete(`/api/rooms/${id}`);
  return response;
};
