import { useState } from 'react';
import useAxios from '../useAxios';

const useCheckNickname = () => {
  const [nickname, setNickname] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);

  const { fetchData, responseData, loading, error } = useAxios({
    method: 'GET',
    url: '/api/member/check-nickname',
    shouldFetch: false,
  });

  const handleCheckNickname = async () => {
    try {
      await fetchData({}, `/api/member/check-nickname?nickname=${nickname}`);
      setIsDuplicate(responseData?.isDuplicate || false);
    } catch (err) {
      console.error('Error checking nickname:', err);
    }
  };

  return {
    nickname,
    setNickname,
    isDuplicate,
    handleCheckNickname,
    loading,
    error,
    responseData,
  };
};

export default useCheckNickname;
