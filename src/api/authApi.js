import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8081/api',
});


export const loginUser = async (email, password) => {
  const response = await API.post('/login', { email, password });
  return response.data; 
};
