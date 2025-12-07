import axios from "./axiosInstance";

export const addScholarship = (data) => axios.post("/scholarship/add", data);
export const getAllScholarships = () => axios.get("/scholarship/get");
// export const getScholarship = (id) => axios.get(`/scholarship/${id}`);
