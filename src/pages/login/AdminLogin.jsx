import React, {useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useLogin from '../../Hooks/user/useLogin';
import logo from '../../assets/logo-green.png';
import GhostButton from '../../components/commons/GhostButton';
import InfoInput from '../../components/commons/InfoInput';
import axios from "axios";
import useAuthStore from "../../store/useAuthStore.js";

export default function AdminLogin() {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuthStore();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading: loginLoading, error: loginError } = useLogin();

    const handleLoginClick = async () => {

        console.log(id, password);

        try {
            const response = await axios({
                url: `http://34.64.39.102:8080/login`,
                method: 'POST',
                data: { loginId: id, password: password },
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Login successful, navigating to main');
            const token = response.headers.authorization;
            window.localStorage.setItem("accessToken", token);

            navigate('/admin');

        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="">
            <div className="w-[640px] m-40 p-16">
                <Link
                    to="/"
                    className="flex flex-col items-center justify-center text-l mb-12"
                >
                    <img className="w-52 h-auto mr-2" src={logo} alt="trip note logo" />
                    <p className="text-lg">여행 경로 정할 땐, 트립 노트</p>
                </Link>
                <InfoInput
                    title="아이디"
                    type="id"
                    value={id}
                    onChange={(e) => {
                        setId(e.target.value);
                    }}
                />
                <InfoInput
                    title="비밀번호"
                    type="password"
                    className="mb-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {loginError && (
                    <p className="text-red-500">로그인 오류: {loginError.message}</p>
                )}
                {loginLoading && <p>로그인 중...</p>}

                <GhostButton title="로그인" onClick={handleLoginClick} />
            </div>
        </div>
    );
}
