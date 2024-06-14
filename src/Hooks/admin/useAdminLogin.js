import useAxios from '../useAxios';
import useAuthStore from '../../store/useAuthStore';

const useAdminLogin = () => {
    const setIsAuth = useAuthStore((state) => state.setIsAuth);
    const { fetchData, error, loading } = useAxios({
        method: 'POST',
        url: '/login',
        shouldFetch: false,
    });

    const adminLogin = async (loginId, password) => {
        try {
            const response = await fetchData({ data: { loginId, password} });

            const accessToken = response.headers.authorization.split(' ')[1];
            localStorage.setItem('accessToken', accessToken);


            setIsAuth(true); // Zustand 상태 업데이트

            return accessToken;
        } catch (err) {
            console.error('Error:', err);
            throw err; // 에러를 호출자에게 전파
        }
    };

    return { adminLogin, loading, error };
};

export default useAdminLogin;
