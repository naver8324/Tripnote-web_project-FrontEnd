import useAxios from '../useAxios';
import { useEffect } from 'react';

// 전체 후기 게시물 GET
const useMemberPosts = (sortOption = 'order', page = 1, size = 30) => {
  const order = sortOption === '최신순' ? 'order' : 'likes';
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: `/api/posts?order=${order}&page=${page}&size=${size}`,
    shouldFetch: true,
  });
  
  useEffect(() => {
    fetchData();
  }, [sortOption, page, size]);

  return { posts: responseData, error, loading, refetch: fetchData };
};

export default useMemberPosts;
