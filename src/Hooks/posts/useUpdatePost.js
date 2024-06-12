import { data } from 'autoprefixer';
import useAxios from '../useAxios';
import { ToastAlert } from '../../components/commons/ToastAlert';

const useUpdatePost = () => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'PATCH',
    url: '',
    shouldFetch: false,
  });

  const updatePost = async (postId, updatedTitle, updatedComment) => {
    try {
      const response = await fetchData({
        data: { title: updatedTitle, content: updatedComment }
      }, `/api/member/posts/${postId}`);
      return response;
    } catch (error) {
      ToastAlert('게시글 수정을 실패하였습니다.', 'error');
      throw error;
    }
  }

  return { updatePost }
};

export default useUpdatePost;
