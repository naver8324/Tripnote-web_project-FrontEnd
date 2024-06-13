import useAxios from '../useAxios.js';

// 전체 회원
const useDeletingComment = (commentId) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'DELETE',
    url: `api/admin/comments/${commentId}`,
    data: null,
    shouldFetch: false,
  });

  return { response: responseData, error, loading, refetch: fetchData };
};

export default useDeletingComment;
