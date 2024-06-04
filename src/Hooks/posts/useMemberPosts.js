import useAxios from '../useAxios';

const useMemberPosts = (page = 1, size = 6) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: `/api/member/posts?page=${page}&size=${size}`,
    shouldFetch: true,
  });

  return { posts: responseData, error, loading, refetch: fetchData };
};

export default useMemberPosts;
