import useAxios from '../useAxios';
import useAuthStore from '../../store/useAuthStore';

const useKakaoRedirect = () => {
    const setIsAuth = useAuthStore((state) => state.setIsAuth);
    const { fetchData, error, loading } = useAxios({
        method: 'GET',
        url: `api/member/kakao/login`,
        shouldFetch: false,
    });

    const kakaoRedirect = async (code) => {
        try {
            console.log('fsdfsadlkflcmslkdsgh');
            const response = await fetchData({params: {code}});

            const accessToken = response.data.jwtToken;
            localStorage.setItem('kakaoToken', response.data.kakaoToken);
            localStorage.setItem('accessToken', accessToken);

            console.log('Login successful');
            console.log(accessToken);
            console.log(localStorage.getItem('kakaoToken'));

            setIsAuth(true); // Zustand 상태 업데이트

            return accessToken;
        } catch (err) {
            console.error('Error:', err);
            throw err; // 에러를 호출자에게 전파
        }
    };

    return { kakaoRedirect, loading, error };
};

export default useKakaoRedirect;
