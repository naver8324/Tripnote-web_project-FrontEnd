import React, { useEffect } from 'react';
import useAxios from '../useAxios';

const useHashTag = () => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: `/api/admin/hashtags`,
    shouldFetch: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  return { Hashtags: responseData, error, loading, refetch: fetchData };
};

export default useHashTag;
