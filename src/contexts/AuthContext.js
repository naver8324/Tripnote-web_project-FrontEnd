import React, { createContext, useState } from 'react';

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 생성
const AuthProvider = ({ children }) => {
  // 인증 정보와 관련된 상태
  const [user, setUser] = useState(null);
  const isAuthenticated = !!user;

  // 로그인 및 로그아웃 함수
  const login = () => {
    // 로그인 로직...
    setUser({ name: '사용자 이름' });
  };

  const logout = () => {
    // 로그아웃 로직...
    setUser(null);
  };

  // AuthContext.Provider로 값을 제공
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
