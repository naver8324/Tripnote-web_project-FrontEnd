import useAxios from '../useAxios';

const useFetchRoutes = () => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: '/api/member/routes',
    shouldFetch: true,
  });

  return { routesData: responseData || [], error, loading, refetch: fetchData };
};

export default useFetchRoutes;
