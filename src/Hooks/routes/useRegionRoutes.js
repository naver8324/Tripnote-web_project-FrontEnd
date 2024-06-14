import { useState, useEffect } from 'react';
import useAxios from '../useAxios';

const regionMapping = {
  서울: 'seoul',
  부산: 'busan',
  대구: 'daegu',
  인천: 'incheon',
  광주: 'gwangju',
  대전: 'daejeon',
  울산: 'ulsan',
  세종: 'sejong',
  경기: 'gyeonggi',
  강원: 'gangwon',
  충북: 'chungbuk',
  충남: 'chungnam',
  전북: 'jeonbuk',
  전남: 'jeonnam',
  경북: 'gyeongbuk',
  경남: 'gyeongnam',
  제주: 'jeju',
};

const useRegionRoutes = (region) => {
  const [routes, setRoutes] = useState([]);
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: `/api/member/routes/region`,
    params: { region: regionMapping[region] || region },
    shouldFetch: false,
  });

  useEffect(() => {
    if (responseData) {
      setRoutes(responseData);
    }
  }, [responseData]);

  const fetchRoutes = () => {
    if (region) {
      fetchData();
    }
  };

  return { routes, error, loading, fetchRoutes };
};

export default useRegionRoutes;
