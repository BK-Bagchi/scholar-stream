import axios from "./axiosInstance";

export const addReview = (data) => axios.post("/review/add", data);
export const getReviews = () => axios.get("/review/get");
export const getUserReviews = () => axios.get("/review/user-reviews");
export const updateReview = (id, data) =>
  axios.put(`/review/update/${id}`, data);
export const deleteReview = (id) => axios.delete(`/review/delete/${id}`);
