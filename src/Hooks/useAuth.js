import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';

const useAuth = () => {
  const authContext = useContext(AuthContext);

  const { user, setUser, isAuthenticated, login, logout } = authContext;

  return {
    user,
    setUser,
    isAuthenticated,
    login,
    logout,
  };
};

export default useAuth;
