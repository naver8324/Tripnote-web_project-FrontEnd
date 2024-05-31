import axios from 'axios';
import { useEffect, useState } from 'react';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.timeout = 5000;

const useAxios = ({ method, url, data, shouldFetch }) => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.request({
        method,
        url: url,
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
