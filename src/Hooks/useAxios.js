import { useEffect, useState } from 'react';
import api from '../utils/api';
import { useErrorBoundary } from 'react-error-boundary';
import qs from 'qs'; // 쿼리 스트링을 만들기 위해 qs 라이브러리 사용

const useAxios = ({
  method,
  url,
  data = {},
  params = {},
  shouldFetch = false,
  showBoundary = false,
}) => {
  const { showBoundary: showBoundaryFunc } = useErrorBoundary();
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (
    fetchParams = params,
    fetchUrl = url,
    fetchMethod = method,
    fetchData = data,
  ) => {
    setLoading(true);
    try {
      console.log('Requesting:', fetchMethod, fetchUrl);
      console.log('Data:', fetchData);

      let finalUrl = fetchUrl;
      if (
        fetchMethod.toUpperCase() === 'GET' &&
        Object.keys(fetchParams).length
      ) {
        const queryString = qs.stringify(fetchParams);
        finalUrl = `${fetchUrl}?${queryString}`;
      }

      const response = await api.request({
        method: fetchMethod,
        url: finalUrl,
        data: fetchMethod.toUpperCase() !== 'GET' ? fetchData : undefined,
      });

      setResponseData(response.data);
      setError(null);
      return response;
    } catch (err) {
      if (showBoundary) {
        showBoundaryFunc(err);
      } else {
        console.error('Request error:', err);
        setError(err.message);
        throw err; // 필요한 경우 호출자에게 에러 전파
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
    }
  }, [shouldFetch]);

  return { responseData, error, loading, fetchData };
};

export default useAxios;
