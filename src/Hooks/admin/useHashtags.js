import { useEffect } from 'react';
import useAxios from '../useAxios.js';

// 전체 회원 GET
const useHashtags = (page = 0, size = 10, token) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: `api/admin/hashtags?page=${page}&size=${size}&sort=id`,
    shouldFetch: true,
  });

  useEffect(() => {
    fetchData();
  }, [page, size, token]);

  return { initialHashtags: responseData, error, loading, refetch: fetchData };
};

export default useHashtags;
