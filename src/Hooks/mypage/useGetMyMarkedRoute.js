import { useEffect, useState } from 'react';
import useAxios from '../useAxios';

const useGetMyMarkedRoute = (initialPage = 1, size = 10) => {
  const [params, setParams] = useState({ page: initialPage, size });
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: '/api/member/routes/bookmark',
    params: params,
    shouldFetch: true,
  });

  useEffect(() => {
    fetchData();
  }, [params]);

  const updateParams = (newParams) => {
    setParams((prevParams) => ({ ...prevParams, ...newParams }));
  };

  return {
    markedRoute: responseData || [],
    error,
    loading,
    refetch: fetchData,
    updateParams
  };
};

export default useGetMyMarkedRoute;
