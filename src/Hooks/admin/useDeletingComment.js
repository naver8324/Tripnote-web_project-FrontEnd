import useAxios from '../useAxios.js';

// 전체 회원
const useDeletingComment = () => {
  const { error, loading, fetchData } = useAxios({
    method: 'DELETE',
    url: `api/admin/comments`,
    shouldFetch: false,
  });

  const DeletingComment = async (comment) => {

    const commentId = comment.id;
    try{
      const response = await fetchData(
          {}, // params 객체
          `api/admin/comments/${commentId}`, // URL
          'DELETE' // method
      );
    }catch (err) {
      throw err; // 에러를 호출자에게 전파
    }
  }

  return { DeletingComment, loading, error};};

export default useDeletingComment;
