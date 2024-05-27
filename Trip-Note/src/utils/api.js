import axios, { Axios, HttpStatusCode, isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.timeout = 5000;

export const api1 = axios.create({ baseURL: 'http://localhost:4001' });

api1.interceptors.request.use(
  (req) => {
    if (req.data && req.data instanceof FormData) {
      req.headers['Content-Type'] = 'multipart/form-data';
    }
    return req;
  },
  (err) => Promise.reject(err),
);

api1.interceptors.response.use(
  (response) => response,
  (err) => {
    if (isAxiosError(err)) {
      if (err.response) {
        const { status } = err.response;
        switch (status) {
          case HttpStatusCode.BadRequest:
            err.message = 'This is BadRequest';
            break;
          case HttpStatusCode.Unauthorized:
            err.message = 'This is Unauthorized';
            break;
          case HttpStatusCode.Forbidden:
            err.message = 'This is Forbidden';
            break;
          case HttpStatusCode.NotFound:
            err.message = 'This is NotFound';
            break;
          case HttpStatusCode.MethodNotAllowed:
            err.message = 'This is MethodNotAllowed';
            break;
          case HttpStatusCode.RequestTimeout:
            err.message = 'This is RequestTimeout';
            break;
          default:
            err.message = `Unexpected Error: ${status}`;
        }
      } else if (err.request) {
        err.message = 'No response received'; // 요청이 이루어졌으나 응답이 없음
      } else {
        err.message = 'An error occurred'; // 요청 설정 중 오류 발생
      }
    } else {
      err.message = 'Network Error'; // 네트워크 오류
    }
    return Promise.reject(err);
  },
);

const useAxios = ({ method, url, data, shouldFetch }) => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api1.request({
        method,
        url,
        data,
      });
      setResponseData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResponseData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
    }
  }, [shouldFetch]);

  return { responseData, error, loading, fetchData };
};

export default useAxios;
