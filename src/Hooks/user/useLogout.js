import { useState } from 'react';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = async () => {
    setLoading(true);
    setError(null);

    //kakao인지 기본 로그인인지 구분
    // const token = localStorage.getItem('accessToken');
    // const kakaoToken = localStorage.getItem('kakaoToken');
    // console.log("token : ", token);
    // console.log("kakaoToken : ", kakaoToken);
    //현재 카카오 로그아웃이 안돼서 일단 모든 경우에 token값을 삭제하도록 설정
    //if(kakaoToken){
    // if (!token) {
    //   try {
    //     // 로컬 스토리지에서 어세스 토큰 제거
    //     await axios.get(`http://localhost:8080/api/member/kakao/logout`,
    //         {
    //           params: {kakaoToken},
    //           headers: {'Authorization': `Bearer ${kakaoToken}`}
    //         });
    //     localStorage.removeItem('kakaoToken');
    //     localStorage.removeItem('accessToken');
    //
    //     console.log('Kakao Logout successful');
    //     return true;
    //   } catch (err) {
    //     console.error('Error:', err);
    //
    //     setError({
    //       message: '로그아웃 중 오류가 발생했습니다',
    //       error: err.message,
    //     });
    //     return false;
    //   } finally {
    //     setLoading(false);
    //   }
    // } else {
    try {
      // 로컬 스토리지에서 어세스 토큰 제거
      console.log("삭제하기 전", localStorage.getItem('kakaoToken'))

      localStorage.removeItem('kakaoToken');
      localStorage.removeItem('accessToken');

      console.log('Logout successful');

      return true;
    } catch (err) {
      console.error('Error:', err);

      setError({
        message: '로그아웃 중 오류가 발생했습니다',
        error: err.message,
      });
      return false;
    } finally {
      setLoading(false);
    }

    // }
  }

  return { logout, loading, error };
};

export default useLogout;
