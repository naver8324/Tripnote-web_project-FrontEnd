import { useState, useEffect } from 'react';
import axios from 'axios';

const useSpots = (region, location = null) => {
  const [spots, setSpots] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpots = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = { region };
        if (location && location.trim() !== '') {
          params.location = location;
        }

        const queryString = new URLSearchParams(params).toString();
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}api/member/spots?${queryString}`,
        );

        setSpots(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setError(`"${location}"에 대한 결과를 찾을 수 없습니다.`);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (region) {
      fetchSpots();
    }
  }, [region, location]);

  return { spots, loading, error };
};

export default useSpots;
