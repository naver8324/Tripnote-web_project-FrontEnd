import useAxios from '../useAxios';

const useDuplicateCheckEmail = () => {
    const { fetchData, error, loading } = useAxios({
        method: 'GET',
        url: '/api/member/check-email',
        shouldFetch: false,
    });

    const duplicateCheckEmail = async (email) => {
        try {
            const response = await fetchData(
                {email},
                '/api/member/check-email',
                'GET'
            );
            return response.data;
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    };

    return { duplicateCheckEmail, loading, error };
};

export default useDuplicateCheckEmail;
