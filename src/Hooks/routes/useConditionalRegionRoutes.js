import { useEffect } from 'react';
import useAxios from '../useAxios';
import useAuthStore from '../../store/useAuthStore';

const useMemberRegionRoutes = (region) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: '/api/member/routes/region',
    params: { region },
    shouldFetch: false, // 자동으로 데이터 요청하지 않음
  });

  useEffect(() => {
    if (region) {
      fetchData();
    }
  }, [region]);

  return { responseData, error, loading, fetchData };
};

const useGuestRegionRoutes = (region) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: '/api/guest/routes/region',
    params: { region },
    shouldFetch: false, // 자동으로 데이터 요청하지 않음
  });

  useEffect(() => {
    if (region) {
      fetchData();
    }
  }, [region]);

  return { responseData, error, loading, fetchData };
};

const useConditionalRegionRoutes = (region) => {
  const isAuth = useAuthStore((state) => state.isAuth);

  const { responseData, error, loading, fetchData } = isAuth
    ? useMemberRegionRoutes(region)
    : useGuestRegionRoutes(region);

  return { responseData, error, loading, fetchData };
};

export default useConditionalRegionRoutes;
