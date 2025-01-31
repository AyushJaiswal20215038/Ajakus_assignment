import axios from "axios";
const API_URL = "https://jsonplaceholder.typicode.com";
export const api = {
  getUser: async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  },
  deleteuser: async (id) => {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return true;
  },
  addUser: async (user) => {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
  },
  updateUser: async (id, user) => {
    const response = await axios.put(`${API_URL}/users/${id}`, user);
    return response.data;
  },
};
