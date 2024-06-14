import { useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios';

const useSearchSpots = (region, location) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    fetchData,
    responseData,
    loading: axiosLoading,
    error: axiosError,
  } = useAxios({
    method: 'GET',
    url: '/api/member/spots',
    shouldFetch: false,
    params: {
      region,
      location,
    },
  });

  useEffect(() => {
    const fetchSpots = async () => {
      setLoading(true);
      try {
        await fetchData();
        setData(responseData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSpots();
  }, [region, location, fetchData]);

  return { data, loading, error };
};

export default useSearchSpots;
