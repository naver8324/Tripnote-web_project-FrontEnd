import React from 'react';
import useAxios from '../useAxios';

const useRestoreMember = () => {
  const { fetchData, error, loading } = useAxios({
    method: 'DELETE',
    url: `api/admin/restore-member`,
    shouldFetch: false,
  });

  const restoreMember = async (email) => {
    try {
      const response = await fetchData(
        { email }, // params 객체
        '/api/admin/restore-member', // URL
        'DELETE', // method
      );
    } catch (err) {
      throw err; // 에러를 호출자에게 전파
    }
  };

  return { restoreMember, loading, error };
};

export default useRestoreMember;
