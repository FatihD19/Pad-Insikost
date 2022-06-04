import { axiosInstance } from "config/axiosInstance";
import { getProfile } from "utils";

export const getPayments = async () => {
  const response = await axiosInstance.get(`/api/payments`);
  const user = getProfile();
  let data = response;
  if (user.role === "PENGHUNI") {
    data = response.filter((item) => item.user_id === user.id);
  }
  return data;
};

export const getPayment = async (id) => {
  const response = await axiosInstance.get(`/api/payments/${id}`);
  return response;
};

export const getUserPaymentStatus = async () => {
  const response = await axiosInstance.get(`/api/payments/user-payment-status`);
  return response;
};

export const createPayment = async (data) => {
  const response = await axiosInstance.post(`/api/payments`, data);
  return response;
};

export const editPayment = async (id, data) => {
  const response = await axiosInstance.put(`/api/payments/${id}`, data);
  return response;
};

export const deletePayment = async (id) => {
  const response = await axiosInstance.delete(`/api/payments/${id}`);
  return response;
};

//tambahan
export const editRejected = async (id) => {
  const response = await axiosInstance.put(`/api/payments/edit-status-rejected/${id}`);
  return response;
};

export const editAccepted = async (id) => {
  const response = await axiosInstance.put(`/api/payments/edit-status-accepted/${id}`);
  return response;
};
