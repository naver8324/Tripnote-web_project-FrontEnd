import React from 'react';
import useAxios from '../useAxios';
import qs from 'qs';

const useDeleteMember = () => {
    const { fetchData, error, loading } = useAxios({
        method: 'DELETE',
        url: `api/admin/delete-member`,
        shouldFetch: false,
    });

    const deleteMember = async (email) => {

        try{
            const response = await fetchData(
                { email }, // params 객체
                '/api/admin/delete-member', // URL
                'DELETE' // method
            );
        }catch (err) {
            throw err; // 에러를 호출자에게 전파
        }
    }

    return { deleteMember, loading, error};
};

export default useDeleteMember;