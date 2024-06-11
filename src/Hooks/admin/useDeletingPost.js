import useAxios from '../useAxios.js';

// 전체 회원
const useDeletingPost = (postId) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'DELETE',
    url: `api/admin/posts/${postId}`,
    data: null,
    shouldFetch: false,
  });

  return { response: responseData, error, loading, refetch: fetchData };
};

export default useDeletingPost;
