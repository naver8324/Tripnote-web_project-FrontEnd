import { useEffect } from "react";
import useAxios from "../useAxios";

const useGetMyReview = (page, size) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: `/api/member/posts?page=${page}&size=${size}`,
    shouldFetch: true,
  });
  
  useEffect(() => {
    fetchData();
  }, [page, size]);

  return { reviews: responseData, error, loading, refetch: fetchData };
};

export default useGetMyReview;