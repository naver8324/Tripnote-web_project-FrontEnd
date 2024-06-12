import { ToastAlert } from "../../components/commons/ToastAlert";
import useAxios from "../useAxios";

const useUpdateComment = () => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'PATCH',
    url: '',
    shouldFetch: false,
  });

  const saveComment = async (commentId, updatedComment) => {
    try {
      const response = await fetchData({
        data: { content: updatedComment }},
        `/api/member/comments/${commentId}`
      );
      return response;
    } catch (error) {
      ToastAlert('댓글 수정을 실패하였습니다.', 'error');
      throw error;
    }
  };

  return { saveComment, responseData, error, loading };
};

export default useUpdateComment;