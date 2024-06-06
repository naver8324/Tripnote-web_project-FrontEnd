import React from 'react';
import useAxios from '../useAxios';

const useDeleteMember = (token) => {
    const { fetchData, error, loading } = useAxios({
        method: 'DELETE',
        url: `api/admin/delete-member`,
        headers: {Authorization: token,},
        shouldFetch: false,
    });

    const deleteMember = async (memberEmail) => {

        console.log("memberEmail - use: ", memberEmail);
        try{
            const response = await fetchData({email: memberEmail});
            console.log(response);
        }catch (err) {
            console.log("use에서 에러발행", err);
            throw err; // 에러를 호출자에게 전파
        }
    }

    return { deleteMember, loading, error};
};

export default useDeleteMember;