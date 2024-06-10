import { useEffect } from 'react';
import useAxios from '../useAxios.js';
import { ToastAlert } from '../../components/commons/ToastAlert.jsx';

// 전체 회원 GET
const useComments = (commentId, nickname, page = 1, size = 10) => {
  if (commentId !== null && nickname !== null) {
    ToastAlert('인자 값이 너무 많습니다.');
  }

  const conditionalString =
    commentId !== null
      ? `commentId=${commentId}&`
      : nickname !== null
        ? `nickname=${nickname}&`
        : '';
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: `api/admin/comments?${conditionalString}page=${page}&size=${size}`,
    shouldFetch: true,
  });

  useEffect(() => {
    fetchData();
  }, [page, size]);

  return { initialComments: responseData, error, loading, refetch: fetchData };
};

export default useComments;
