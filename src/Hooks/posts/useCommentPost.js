import { ToastAlert } from "../../components/commons/ToastAlert";
import useAxios from "../useAxios";

const useCommentPost = (postId) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'POST',
    url: `/api/member/comments?postId=${postId}`,
    shouldFetch: false,
  });

  const leaveComment = async (content) => {
    try {
      const response = await fetchData({
        data: { content },
      });
      return response.data;
    } catch (error) {
      ToastAlert('댓글 등록에 실패했습니다.', 'error');
      throw error;
    }
  };

  return { leaveComment, responseData, loading, error };
};

export default useCommentPost;
