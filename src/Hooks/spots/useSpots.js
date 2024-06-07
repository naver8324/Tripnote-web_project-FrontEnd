import { useEffect, useState } from 'react';
import useAxios from '../useAxios';

const useSpots = (region) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: '/api/member/spots',
    params: { region },
    shouldFetch: true,
  });

  useEffect(() => {
    fetchData();
  }, [region]);

  return { spots: responseData, error, loading };
};

export default useSpots;
