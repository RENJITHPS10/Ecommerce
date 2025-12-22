import axios from "axios";
import { API_URL } from "../utils/url";

// Register user
export const registerUserAPI = async (userData) => {
  const response = await axios.post(`${API_URL}/api/v1/users/register`, userData);
  return response.data;
};

// user login
export const loginUserAPI = async (userData) => {
  const response = await axios.post(`${API_URL}/api/v1/users/login`, userData);
  return response.data;
};



//admin
export const getAdminDataAPI = async (token) => {
  const { data } = await axios.get(`${API_URL}/api/v1/users/admin`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

