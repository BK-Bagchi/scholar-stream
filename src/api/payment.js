import axios from "./axiosInstance";

export const makePayment = (data) =>
  axios.post("/payment/create-session", data);
export const getSession = (id) => axios.get(`/payment/session/${id}`);
