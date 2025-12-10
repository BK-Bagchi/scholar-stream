import axios from "./axiosInstance";

export const applyScholarship = (data) => axios.post("/application/post", data);
export const getAllApplications = () => axios.get("/application/all");
export const getAnalytics = () => axios.get("/application/analytics");
export const getUserApplications = () => axios.get("/application/user");
export const updateApplication = (id, data) =>
  axios.put(`/application/update/${id}`, data);
export const updateApplicationStatus = (id, data) =>
  axios.patch(`/application/update-status/${id}`, data);
export const deleteApplication = (id) =>
  axios.delete(`/application/delete/${id}`);
