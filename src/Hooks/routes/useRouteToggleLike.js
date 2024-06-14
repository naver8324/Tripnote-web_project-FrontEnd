import useAxios from '../useAxios';

const useRouteToggleLike = (routeId) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'PATCH',
    url: `/api/member/routes/like/${routeId}`,
    shouldFetch: false,
  });

  const toggleLike = async () => {
    await fetchData();
  };

  return { toggleLike, error, loading };
};

export default useRouteToggleLike;
