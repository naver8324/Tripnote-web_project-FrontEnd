import useAxios from "../useAxios";

const useUpdateComment = (commentId) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'PATCH',
    url: `/api/member/comments/${commentId}`,
    shouldFetch: false,
  });

  const saveComment = async (updatedComment) => {
    try {
      const response = await fetchData({
        data: { updatedComment },
      });
      re
    } catch (error) {
      
    }
  }
};

export default useUpdateComment;