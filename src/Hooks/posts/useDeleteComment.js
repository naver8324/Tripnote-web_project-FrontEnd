import { ToastAlert } from '../../components/commons/ToastAlert';
import useAxios from '../useAxios';

const useDeleteComment = () => {
  const { fetchData } = useAxios({
    method: 'DELETE',
    url: '', // URL은 여기서 지정하지 않고, fetchData 호출 시 지정
    shouldFetch: false, // 자동으로 fetchData를 호출하지 않음
  });

  const deleteComment = async (commentId) => {
    try {
      // fetchData를 호출하여 삭제 요청
      const response = await fetchData({}, `/api/member/comments/${commentId}`);
      return response;
      
    } catch (error) {
      ToastAlert('댓글 삭제를 실패하였습니다.', 'error');
      throw error;
    }
  };

  return deleteComment;
};

export default useDeleteComment;
