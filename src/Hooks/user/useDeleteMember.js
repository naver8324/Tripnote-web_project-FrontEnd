import useAxios from '../useAxios';
import useAuthStore from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const useDeleteMember = () => {
  const { fetchData, loading, error } = useAxios({
    method: 'DELETE',
    url: '/api/member/delete-member',
    shouldFetch: false,
  });
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const deleteMember = async () => {
    try {
      await fetchData();
      logout(); // 회원 탈퇴 후 로그아웃
      navigate('/login'); // 로그인 페이지로 리다이렉트
    } catch (err) {
      console.error('Error deleting member:', err);
      throw err;
    }
  };

  return { deleteMember, loading, error };
};

export default useDeleteMember;
