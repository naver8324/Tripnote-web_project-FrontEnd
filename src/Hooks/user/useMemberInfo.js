import useAxios from '../useAxios';
import useUserStore from '../../store/useUserStore';

const useMemberInfo = () => {
  const { fetchData, loading, error } = useAxios({
    method: 'GET',
    url: '/api/member',
    shouldFetch: true,
  });
  const setEmail = useUserStore((state) => state.setEmail);
  const setNickname = useUserStore((state) => state.setNickname);

  const memberInfo = async () => {
    try {
      const response = await fetchData();
      setEmail(response.data.email);
      setNickname(response.data.nickname);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { memberInfo, loading, error };
};

export default useMemberInfo;
