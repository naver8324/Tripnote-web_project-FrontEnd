import { useState } from 'react';
import useAxios from '../useAxios';
import { ToastAlert } from '../../components/commons/ToastAlert';
const useCheckedPassword = () => {
  const [isValid, setIsValid] = useState(null);
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'POST',
    url: '/api/member/validate-password',
    shouldFetch: false,
    showBoundary: false,
  });

  const checkPassword = async (password) => {
    try {
      const response = await fetchData({ data: { password } });
      if (response.data === true) {
        setIsValid(true);
      } else {
        setIsValid(false);
        ToastAlert('비밀번호를 확인해주세요', 'error');
      }
    } catch (err) {
      ToastAlert(' 다시 시도해주세요.', 'error');
    }
  };

  return { checkPassword, loading, error, isValid };
};

export default useCheckedPassword;
