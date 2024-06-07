import useAxios from '../useAxios.js';

// 전체 회원
const useDeletingHashtag = (data) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'DELETE',
    url: `api/admin/hashtags/delete/${data.id}`,
    data: null,
    shouldFetch: false,
  });

  return { response: responseData, error, loading, refetch: fetchData };
};

export default useDeletingHashtag;
