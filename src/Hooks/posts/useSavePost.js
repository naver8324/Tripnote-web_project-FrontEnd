import useAxios from '../useAxios';
import { ToastAlert } from '../../components/commons/ToastAlert';
//user4
const useSavePost = (routeId) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'POST',
    url: `/api/member/posts?routeId=${routeId}`,
    shouldFetch: false,
  });

  const createPost = async (title, content) => {
    try {
      const response = await fetchData({
        data: { title, content },
      });
      return response.data;
    } catch (error) {
      ToastAlert('게시글 등록에 실패했습니다.', 'error');
      throw error;
    }
  };

  return { createPost, responseData, loading, error };
};

export default useSavePost;
