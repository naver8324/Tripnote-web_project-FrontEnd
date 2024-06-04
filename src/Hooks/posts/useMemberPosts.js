import useAxios from '../useAxios';
import { useEffect } from 'react';

const useMemberPosts = (sortOption = 'order', page = 1, size = 6) => {
  const order = sortOption === '최신순' ? 'order' : 'likes';
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: `/api/member/posts?order=${order}&page=${page}&size=${size}`,
    shouldFetch: true,
  });

  useEffect(() => {
    fetchData(); // sortOption이 변경될 때마다 fetchData 호출
  }, [sortOption, page, size]);

  return { posts: responseData, error, loading, refetch: fetchData };
};

export default useMemberPosts;