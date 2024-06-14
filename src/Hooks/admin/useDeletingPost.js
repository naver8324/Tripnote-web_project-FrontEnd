import useAxios from '../useAxios.js';

// 전체 회원
const useDeletingPost = () => {
    const { fetchData, error, loading } = useAxios({
        method: 'DELETE',
        url: `api/admin/posts`,
        shouldFetch: false,
    });

    const DeletingPost = async (post) => {

        const postId = post.id;
        try{
            const response = await fetchData(
                {}, // params 객체
                `api/admin/posts/${postId}`, // URL
                'DELETE' // method
            );
        }catch (err) {
            throw err; // 에러를 호출자에게 전파
        }
    }

    return { DeletingPost, loading, error};
};

export default useDeletingPost;
