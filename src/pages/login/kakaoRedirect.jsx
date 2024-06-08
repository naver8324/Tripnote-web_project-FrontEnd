import { useEffect } from "react";
import Spinner from "../../components/commons/Spinner.jsx";
import { useNavigate } from "react-router-dom";
import useKakaoRedirect from "../../Hooks/user/useKakaoRedirect.js";

export default function KakaoRedirect() {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");
    const { kakaoRedirect } = useKakaoRedirect();
    console.log("code : ", code);

    //test useEffect가 두번 사용되어서 한번 성공하고 두번째는 실패하게 됩니다.
    //실서버에서는 문제 없을 거로 예상됩니다.
    //카카오 로그인 시 기존 로그인 토큰 발급 방법을 이용하여 토큰을 발급해야 합니다.
    const handleKakaoRedirect = async (code) => {
        try {
            await kakaoRedirect(code);
            console.log('kakao Login successful, navigating to main');
            navigate("/");
        } catch (err) {
            console.error("kakao redirect error: ", err);
        }
    };

    useEffect(() => {
        if(code) {
            handleKakaoRedirect(code);
        }
    }, []); // 의존성 배열을 비워둠

    return <Spinner />;
}