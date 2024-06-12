import { useEffect } from 'react';
import useAxios from '../useAxios';

const useSpotRoutes = (spotId) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: '/api/member/routes/spot',
    params: { spots: spotId },
    shouldFetch: false, // 자동으로 데이터 요청하지 않음
  });

  useEffect(() => {
    if (spotId) {
      fetchData();
    }
  }, [spotId]);

  return { responseData, error, loading };
};

export default useSpotRoutes;
