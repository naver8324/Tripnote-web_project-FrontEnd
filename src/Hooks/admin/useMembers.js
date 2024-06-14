import { useEffect } from 'react';
import useAxios from '../useAxios.js';

// 전체 회원 GET
const useMembers = (page, size) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: `api/admin/members`,
    params: { page: page, size: size },
    shouldFetch: true,
  });
  useEffect(() => {
    fetchData();
  }, [page, size]);

  return { members: responseData, error, loading, refetch: fetchData };
};

export default useMembers;
