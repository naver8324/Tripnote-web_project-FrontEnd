import { ToastAlert } from '../../components/commons/ToastAlert';
import useAxios from '../useAxios';

const useSearchByTag = (tag, sortOption, page, size) => {
  const order = sortOption === '최신순' ? 'order' : 'likes';
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'POST',
    url: `/api/posts?order=${order}&page=${page}&size=${size}`,
    shouldFetch: false,
  });

  const searchByTag = async (tag) => {
    try {
      const response = await fetchData({
        data: [tag],
      });
      
      return response.data;
    } catch (err) {
      ToastAlert('오류가 발생했습니다. 다시 시도해주세요.', 'error');
      throw err;
    }
  };

  return { searchByTag, responseData, loading, error };
};

export default useSearchByTag;
