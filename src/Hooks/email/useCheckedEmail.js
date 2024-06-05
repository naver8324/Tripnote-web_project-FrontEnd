import React from 'react';
import useAxios from '../useAxios';

const useCheckedEmail = () => {
  const { fetchData, error, loading } = useAxios({
    method: 'POST',
    url: '/api/mail/checkmail',
  });

  const checkEmail = async (email, authNum) => {
    try {
      const response = await fetchData({ data: { email, authNum } });
      return response.data;
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  };

  return { checkEmail, loading, error };
};

export default useCheckedEmail;
