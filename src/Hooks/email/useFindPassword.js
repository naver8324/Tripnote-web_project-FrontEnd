import React from 'react';
import useAxios from '../useAxios';

const useFindPassword = () => {
    const { fetchData, error, loading } = useAxios({
        method: 'POST',
        url: '/api/mail/reset-password',
        shouldFetch: false,
        showBoundary: false,
    });

    const findPassword = async (email, authNum) => {
        try {
            const response = await fetchData({ data: { email, authNum } });
            return response.data;
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    };

    return { findPassword, loading, error };
};

export default useFindPassword;
