import useAxios from "../useAxios";

const useGetMyMarkedRoute = () => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: '/api/member/routes/bookmark',
    shouldFetch: true,
  });

  return { markedRoute: responseData || [], error, loading, refetch: fetchData };
}

export default useGetMyMarkedRoute;