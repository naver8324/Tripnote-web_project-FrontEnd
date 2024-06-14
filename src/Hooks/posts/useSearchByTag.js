import { ToastAlert } from '../../components/commons/ToastAlert';
import useAxios from '../useAxios';

const useSearchByTag = () => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'POST',
    url: '',
    shouldFetch: false,
  });

  const searchByTag = async (tag, sortOption, page, size) => {
    const order = sortOption === '최신순' ? 'order' : 'likes';
    try {
      const response = await fetchData(
        {
          data: [tag],
        },
        `/api/posts?order=${order}&page=${page}&size=${size}`,
      );
      return response.data;
    } catch (err) {
      ToastAlert('다시 시도해주세요.', 'error');
      throw err;
    }
  };

  return { searchByTag, responseData, loading, error };
};

export default useSearchByTag;
