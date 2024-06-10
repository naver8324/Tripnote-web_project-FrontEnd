import useAxios from '../useAxios';
import useUserStore from '../../store/useUserStore';

const useMemberInfo = () => {
  const { fetchData, loading, error } = useAxios({
    method: 'GET',
    url: '/api/member',
    shouldFetch: false,
  });
  const setEmail = useUserStore((state) => state.setEmail);
  const setNickname = useUserStore((state) => state.setNickname);

  const memberInfo = async () => {
    try {
      const response = await fetchData();
      const userNickname = response.data.nickname;
      localStorage.setItem('userNickname', userNickname);

      setEmail(response.data.email);
      setNickname(response.data.nickname);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { memberInfo, loading, error };
};

export default useMemberInfo;
