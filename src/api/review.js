import axios from "./axiosInstance";

export const addReview = (data) => axios.post("/review/add", data);
export const getReviews = () => axios.get("/review/get");
export const getUserReviews = () => axios.get("/review/user-reviews");
