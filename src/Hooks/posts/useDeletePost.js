import { ToastAlert } from '../../components/commons/ToastAlert';
import useAxios from '../useAxios';

const useDeletePost = () => {
  const { fetchData } = useAxios({
    method: 'DELETE',
    url: '',
    shouldFetch: false,
  });

  const deletePost = async (postId) => {
    try {
      const response = await fetchData({}, `/api/member/posts/${postId}`);
      return response;
    } catch (error) {
      ToastAlert('게시글 삭제를 실패하였습니다.', 'error');
      throw error;
    }
  };

  return deletePost;
};

export default useDeletePost;
