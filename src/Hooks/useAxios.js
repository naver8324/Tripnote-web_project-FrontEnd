import { useEffect, useState } from 'react';
import api from '../utils/api';
import { useErrorBoundary } from 'react-error-boundary';
import qs from 'qs';

const useAxios = ({
  method,
  url,
  data = {},
  shouldFetch = false,
  showBoundary = false,
  params = {},
}) => {
  const { showBoundary: showBoundaryFunc } = useErrorBoundary();
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (
    fetchParams = params,
    fetchUrl = url,
    fetchMethod = method,
  ) => {
    setLoading(true);
    try {
      let finalUrl = fetchUrl;
      if (
        (fetchMethod.toUpperCase() === 'GET' ||
          fetchMethod.toUpperCase() === 'DELETE') &&
        Object.keys(fetchParams).length
      ) {
        const queryString = qs.stringify(fetchParams);
        finalUrl = `${fetchUrl}?${queryString}`;
      }

      const response = await api.request({
        method: fetchMethod,
        url: finalUrl,
        ...(fetchMethod === 'GET' || fetchMethod === 'DELETE'
          ? {}
          : { data: fetchParams.data || data }),
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
