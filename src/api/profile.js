import axios from "./axiosInstance";

export const createProfile = (data) => axios.post(`/profile`, data);
export const getProfileById = (id) => axios.get(`/profile/${id}`);
export const getAllProfile = () => axios.get(`/profile/allProfile`);
export const updateProfile = (id, data) => axios.put(`/profile/${id}`, data);
export const deleteProfile = (id) => axios.delete(`/profile/${id}`);
