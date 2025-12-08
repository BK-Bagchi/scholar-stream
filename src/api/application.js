import axios from "./axiosInstance";

export const applyScholarship = (data) => axios.post("/application/post", data);
export const getAllApplications = () => axios.get("/application/all");
export const getUserApplications = () => axios.get("/application/user");
