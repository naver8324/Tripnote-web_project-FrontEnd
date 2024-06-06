import React from 'react';
import useAxios from '../useAxios';

const useDeleteMember = () => {
    const { fetchData, error, loading } = useAxios({
        method: 'DELETE',
        url: `api/admin/delete-member`,
        shouldFetch: false,
    });

    const deleteMember = async (email) => {

        console.log("memberEmail - use: ", email);
        try{
            const response = await fetchData( {params: {email}} );
            console.log(response);
        }catch (err) {
            console.log("use에서 에러발행", err);
            throw err; // 에러를 호출자에게 전파
        }
    }

    return { deleteMember, loading, error};
};

export default useDeleteMember;