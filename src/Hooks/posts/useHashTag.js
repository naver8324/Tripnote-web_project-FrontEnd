import React, { useEffect } from 'react';
import useAxios from '../useAxios';

const useHashTag = (cityOption = true) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: `/api/hashtags/isCity?isCity=${cityOption}`,
    shouldFetch: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  return { Hashtags: responseData, error, loading, refetch: fetchData };
};

export default useHashTag;
