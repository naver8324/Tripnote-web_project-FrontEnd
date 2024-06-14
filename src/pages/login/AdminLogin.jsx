import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/logo-green.png';
import GhostButton from '../../components/commons/GhostButton';
import InfoInput from '../../components/commons/InfoInput';
import { ToastAlert } from '../../components/commons/ToastAlert.jsx';
import useAdminLogin from '../../Hooks/admin/useAdminLogin.js';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const {
    adminLogin,
    loading: loginLoading,
    error: loginError,
  } = useAdminLogin();

  const handleLoginClick = async () => {
    try {
      await adminLogin(id, password);
      ToastAlert('로그인 되었습니다.', 'success');

      navigate('/admin');
    } catch (err) {
      console.error('Login failed:', err);
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
