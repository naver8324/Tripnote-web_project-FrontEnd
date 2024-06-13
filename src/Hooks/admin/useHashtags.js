import { useEffect } from 'react';
import useAxios from '../useAxios.js';

// 전체 회원 GET
const useHashtags = (page, size) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: `api/admin/hashtags`,
    params: {page: page, size: size},
    shouldFetch: true,
  });

  useEffect(() => {
    fetchData();
  }, [page, size]);

  return { initialHashtags: responseData, error, loading, refetch: fetchData };
};

export default useHashtags;
