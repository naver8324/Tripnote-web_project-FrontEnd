import { useEffect } from 'react';
import useAxios from '../useAxios';

const useGetComment = (postId, page = 1, size = 30) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: `/api/member/comments?postId=${postId}&page=${page}&size=${size}`,
    shouldFetch: true,
  });

  useEffect(() => {
    fetchData();
  }, [postId, page, size]);

  return { comments: responseData, error, loading, refetch: fetchData };
};

export default useGetComment;
