import { useState } from 'react';
import useAxios from '../useAxios';
import useAuthStore from '../../store/useAuthStore';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setIsAuth } = useAuthStore();
  const { fetchData } = useAxios({
    method: 'POST',
    url: '/api/member/logout',
    shouldFetch: false,
  });

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      // API 호출로 로그아웃 요청
      const response = await fetchData();

      if (response.status === 200) {
        console.log('Logout successful');
      } else {
        console.error('Logout failed:', response.data);
        setError({
          message: '로그아웃에 실패했습니다',
          error: response.data,
        });
      }
    } catch (err) {
      console.error('Error:', err);
      setError({
        message: '로그아웃 중 오류가 발생했습니다',
        error: err.message,
      });
    } finally {
      // 로그아웃이 성공하든 실패하든, 로컬 스토리지에서 어세스 토큰 제거 및 인증 상태 업데이트
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userNickname');
      setIsAuth(false);
      setLoading(false);
    }
  };

  return { logout, loading, error };
};

export default useLogout;
