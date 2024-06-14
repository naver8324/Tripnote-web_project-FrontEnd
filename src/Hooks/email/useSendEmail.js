import React from 'react';
import useAxios from '../useAxios';

const useSendEmail = () => {
  const { fetchData, error, loading } = useAxios({
    method: 'POST',
    url: '/api/mail/sendmail',
  });

  const SendEmail = async (email) => {
    try {
      const response = await fetchData({ data: { email } });

      return response.data;
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  };

  return { SendEmail, loading, error };
};

export default useSendEmail;
