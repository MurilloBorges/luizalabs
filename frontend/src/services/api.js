import axios from 'axios';
import { getToken } from './authentication';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.request.use(async (config) => {
  const configuration = config;
  const token = getToken();
  if (token) {
    configuration.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
