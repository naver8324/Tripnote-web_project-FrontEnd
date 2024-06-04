import { useEffect, useState } from 'react';
import api from '../utils/api';

const useAxios = ({
  method,
  url,
  data = {},
  shouldFetch = false,
  headers = {},
}) => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      console.log('Requesting:', method, url);
      console.log('Headers:', headers);
      console.log('Data:', data);
      const response = await api.request({
        method,
        url,
        data: params.data || data,
        headers: params.headers || headers,
      });
      setResponseData(response.data);
      setError(null);
      return response;
    } catch (err) {
      console.error('Request error:', err);
      setError(err.message);
      setResponseData(null);
      throw err; // 필요한 경우 호출자에게 에러 전파
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
