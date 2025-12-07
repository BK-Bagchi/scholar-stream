import axios from "./axiosInstance";

export const getUserProfile = () => axios.get(`/profile/user`);
export const getAllProfile = () => axios.get(`/profile/allProfile`);
export const updateProfile = (id, data) => axios.put(`/profile/${id}`, data);
export const updateProfileRole = (id, data) =>
  axios.put(`/profile/role/${id}`, data);
