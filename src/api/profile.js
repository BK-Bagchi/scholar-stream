import axios from "./axiosInstance";

export const getAllProfile = () => axios.get(`/profile/allProfile`);
export const updateProfile = (id, data) => axios.put(`/profile/${id}`, data);
