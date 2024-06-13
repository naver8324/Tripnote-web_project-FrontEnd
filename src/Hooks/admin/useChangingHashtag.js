import useAxios from '../useAxios.js';

// 전체 회원 GET
const useChangingHashtag = (data) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'PATCH',
    url: `api/admin/hashtags/update/${data.id}`,
    data: { name: data.name, city: data.city },
    shouldFetch: false,
  });

  return { response: responseData, error, loading, refetch: fetchData };
};

export default useChangingHashtag;
