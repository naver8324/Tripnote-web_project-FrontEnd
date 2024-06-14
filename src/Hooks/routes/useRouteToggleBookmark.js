import useAxios from '../useAxios';

const useRouteToggleBookmark = (routeId) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'PATCH',
    url: `/api/member/routes/bookmark/${routeId}`,
    shouldFetch: false,
  });

  const toggleBookmark = async () => {
    await fetchData();
  };

  return { toggleBookmark, error, loading };
};

export default useRouteToggleBookmark;
