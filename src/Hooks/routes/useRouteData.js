import { useEffect } from 'react';
import useAxios from '../useAxios';

const useRouteData = (routeId, shouldFetch = true) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: `/api/member/routes/${routeId}`,
    shouldFetch,
  });

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
    }
  }, [routeId, shouldFetch]);

  return { routeData: responseData, error, loading, refetch: fetchData };
};

export default useRouteData;
