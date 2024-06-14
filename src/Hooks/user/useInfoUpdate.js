import useAxios from '../useAxios';

const useInfoUpdate = () => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'PATCH',
    url: '/api/member/update-profile',
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
