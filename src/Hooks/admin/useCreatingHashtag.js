import useAxios from '../useAxios.js';

// 전체 회원 GET
const useMakingHashtag = (data) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'POST',
    url: `api/admin/hashtags/create`,
    data: data,
    shouldFetch: false,
  });

  return { response: responseData, error, loading, refetch: fetchData };
};

export default useMakingHashtag;
