import React, { useEffect } from 'react';
import useAxios from '../useAxios';

const useDetailPost = (postId) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: `/api/member/posts/${postId}`,
    shouldFetch: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  return { detailPost: responseData, error, loading, refetch: fetchData };
};

export default useDetailPost;
