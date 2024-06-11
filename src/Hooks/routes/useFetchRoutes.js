import useAxios from '../useAxios';

const useFetchRoutes = () => {
  const { responseData, error, loading } = useAxios({
    method: 'GET',
    url: '/api/member/routes',
    shouldFetch: true,
  });

  return { routes: responseData?.content || [], error, loading };
};

export default useFetchRoutes;
