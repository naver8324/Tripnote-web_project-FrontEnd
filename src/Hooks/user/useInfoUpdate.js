import useAxios from '../useAxios';

const useInfoUpdate = () => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'POST',
    url: '/api/member/update',
    data: {},
    shouldFetch: false,
    showBoundary: true,
  });

  const updateInfo = async (data) => {
    return fetchData({ data });
  };

  return { responseData, error, loading, updateInfo };
};

export default useInfoUpdate;
