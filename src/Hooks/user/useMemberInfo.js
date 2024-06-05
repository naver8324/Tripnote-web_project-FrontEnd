import React from 'react';
import useAxios from '../useAxios';

const useMemberInfe = () => {
  const { fetchData, loading, error } = useAxios({
    method: 'GET',
    url: '/api/member',
    shouldFetch: true,
  });

  const memberInfo = async () => {
    try {
      const response = await fetchData();
      console.log(response.data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  return { memberInfo, loading, error };
};
export default useMemberInfe;
