import axios from "./axiosInstance";

export const issueToken = (data) => axios.post("/auth/issueJWT", data);
