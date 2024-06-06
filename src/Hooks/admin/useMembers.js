import { useEffect } from 'react';
import useAxios from "../useAxios.js";

// 전체 회원 GET
const useMembers = (page = 0, size = 10, token) => {
    const { responseData, error, loading, fetchData } = useAxios({
        method: 'GET',
        url: `api/admin/members?page=${page}&size=${size}&sort=id`,
        headers: {Authorization: token,},
        shouldFetch: true,
    });


    console.log('api check', responseData )
    useEffect(() => {
        fetchData();
    }, [page, size, token]);

    return { members: responseData, error, loading, refetch: fetchData };
};

export default useMembers;
