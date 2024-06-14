import useAxios from '../useAxios';

const useCreateRoute = () => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'POST',
    url: '/api/member/routes',
    shouldFetch: false,
  });

  const createRoute = async (routeData) => {
    try {
      const response = await fetchData({ data: routeData });
      return response;
    } catch (err) {
      throw err;
    }
  };

  return { createRoute, responseData, error, loading };
};

export default useCreateRoute;
