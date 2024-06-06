import useAxios from '../useAxios';

const useInteractionPost = (postId, option) => {
  const { fetchData } = useAxios({
    method: 'GET',
    url: `/api/member/posts/${postId}/${option}`,
    shouldFetch: false,
  });

  const interact = async () => {
    await fetchData();
  };

  return { interact };
};

export default useInteractionPost;