import useAxios from '../useAxios';

const useNextSpotRecommend = () => {
  const { fetchData, error, loading } = useAxios({
    method: 'GET',
    url: `/api/member/spots`,
    shouldFetch: false,
  });

  const NextSpot = async (spotId) => {
    try {
      const response = await fetchData(
        {}, // params 객체
        `/api/member/spots/${spotId}`, // URL
        'GET', // method
      );
      return response;
    } catch (err) {
      throw err; // 에러를 호출자에게 전파
    }
  };

  return NextSpot;
};

export default useNextSpotRecommend;
