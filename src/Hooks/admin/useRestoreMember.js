import React from 'react';
import useAxios from '../useAxios';

const useRestoreMember = () => {
    const { fetchData, error, loading } = useAxios({
        method: 'DELETE',
        url: `api/admin/restore-member`,
        shouldFetch: false,
    });

    const restoreMember = async (email) => {

        console.log("memberEmail - use: ", email);
        try{
            const response = await fetchData( {params: {email}} );
            console.log(response);
        }catch (err) {
            console.log(err);
            throw err; // 에러를 호출자에게 전파
        }
    }

    return { restoreMember, loading, error};
};

export default useRestoreMember;