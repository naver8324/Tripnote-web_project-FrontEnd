import useAxios from '../useAxios';
import useUserStore from '../../store/useUserStore';
import useLogout from './useLogout';
import { useNavigate } from 'react-router-dom';

const useMemberInfo = () => {
  const { fetchData, loading, error } = useAxios({
    method: 'GET',
    url: '/api/member',
    shouldFetch: false,
  });
  const setEmail = useUserStore((state) => state.setEmail);
  const setNickname = useUserStore((state) => state.setNickname);
  const { logout } = useLogout(); // useLogout 훅을 호출하여 logout 함수를 가져옴
  const navigate = useNavigate();

  const memberInfo = async () => {
    try {
      const response = await fetchData();
      const userEmail = response.data.email;
      const userNickname = response.data.nickname;

      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('userNickname', userNickname);

      setEmail(userEmail);
      setNickname(userNickname);
      return response.data;
    } catch (err) {
      await logout(); // logout 함수를 호출하여 로그아웃 처리
      navigate('/login');
      console.error(err);
      throw err;
    }
  };

  return { memberInfo, loading, error };
};

export default useMemberInfo;
