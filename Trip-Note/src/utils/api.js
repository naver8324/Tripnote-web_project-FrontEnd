import axios from 'axios';
import { useEffect, useState } from 'react';

const useAxios = (opts, axiosInstance = axios.create({ timeout: 5000 })) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });
  const [trigger, setTrigger] = useState(0);

  if (!opts.url) {
    return { ...state, refetch: () => {} };
  }

  const refetch = () => {
    setState((prev) => ({
      ...prev,
      loading: true,
    }));
    setTrigger(Date.now());
  };

  const handleError = (error) => {
    let errorMessage;

    if (error.response) {
      // 서버가 상태 코드로 응답한 경우
      switch (error.response.status) {
        case 400:
          errorMessage = 'Bad Request';
          break;
        case 403:
          errorMessage = 'Forbidden';
          break;
        case 404:
          errorMessage = 'Not Found';
          break;
        default:
          errorMessage = `Error: ${error.response.status}`;
      }
    } else if (error.request) {
      // 요청이 이루어졌으나 응답이 없었음
      if (error.message === 'timeout of 5000ms exceeded') {
        errorMessage = 'Request Timed Out'; //타임아웃 메세지
      }
      errorMessage = 'No response from server';
    } else {
      errorMessage = error.message;
    }

    return errorMessage;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance(opts);
        setState({
          loading: false,
          data: response.data,
          error: null,
        });
      } catch (error) {
        const errorMessage = handleError(error);
        setState({
          loading: false,
          error: errorMessage,
          data: null,
        });
      }
    };

    fetchData();
  }, [trigger, opts]);

  return { ...state, refetch };
};

export default useAxios;
