import api from '../utils/api';
import { useEffect, useState } from 'react';

const useAxios = ({ method, url, data, shouldFetch }) => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.request({
        method,
        url: baseURL + url,
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
