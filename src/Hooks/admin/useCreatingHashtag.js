import useAxios from '../useAxios.js';

// 전체 회원 GET
const useCreatingHashtag = (data) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'POST',
    url: `api/admin/hashtags/create`,
    data: { name: data.name, city: data.city },
    shouldFetch: false,
  });

  return { response: responseData, error, loading, refetch: fetchData };
};

export default useCreatingHashtag;
