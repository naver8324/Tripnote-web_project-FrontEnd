import useAxios from '../useAxios';

const useCheckNickname = () => {
  const { fetchData, loading, error } = useAxios({
    method: 'GET',
    url: '/api/member/check-nickname',
    shouldFetch: false,
  });

  const checkNickname = async (nickname) => {
    try {
      const response = await fetchData(
          {nickname},
          `/api/member/check-nickname`,
          'GET');

      //중복 여부 false/true 반환
      return response.data;
    } catch (err) {
      console.error('Error checking nickname:', err);
    }
  };

  return {checkNickname, loading, error};
};

export default useCheckNickname;
