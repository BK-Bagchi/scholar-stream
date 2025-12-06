import axios from "./axiosInstance";

export const makeConnection = (data) => axios.post(`/connection`, data);
export const getConnectionList = () => axios.get(`/connection/connectedList`);
