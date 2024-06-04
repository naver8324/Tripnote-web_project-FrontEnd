import useAxios from '../useAxios';

const useMemberPosts = (page = 1, size = 6) => {
  const token = localStorage.getItem('accessToken');
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: `/api/member/posts?page=${page}&size=${size}`,
    shouldFetch: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return { posts: responseData, error, loading, refetch: fetchData };
};

export default useMemberPosts;
