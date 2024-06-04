import axios, { isAxiosError } from 'axios';
import errorHandler from './errorHandler';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.timeout = 5000;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  (req) => {
    if (req.data instanceof FormData) {
      req.headers['Content-Type'] = 'multipart/form-data';
    }
    return req;
  },
  (err) => Promise.reject(err),
);

api.interceptors.response.use(
  (response) => response,
  (err) => errorHandler(err),
);

export default api;
