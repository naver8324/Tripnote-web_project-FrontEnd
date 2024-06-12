import { useEffect } from "react";
import useAxios from "../useAxios";

const useGetMyMarkedReview = (page, size) => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: `/api/member/posts/mark?page=${page}&size=${size}`,
    shouldFetch: true,
  });
  
  useEffect(() => {
    fetchData();
  }, [page, size]);

  return { markedReviews: responseData, error, loading, refetch: fetchData };
};

export default useGetMyMarkedReview;