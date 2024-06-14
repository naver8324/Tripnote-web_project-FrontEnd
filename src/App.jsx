import React, { useEffect } from 'react';
import './App.css';
import Footer from './components/ui/Footer';
import Header from './components/ui/Header';
import './index.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useMemberInfo from './Hooks/user/useMemberInfo';
import useAuthStore from './store/useAuthStore';
import { jwtDecode } from 'jwt-decode';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { memberInfo } = useMemberInfo();
  const { setIsAuth } = useAuthStore();

  useEffect(() => {
    const initialAuthCheck = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          await memberInfo();
          setIsAuth(true);
          console.log('Initial member info fetch successful');
        } catch (error) {
          setIsAuth(false);
          console.log('Initial member info fetch failed, redirecting to login');
          navigate('/login');
        }
      } else {
        setIsAuth(false);
        console.log('No token found, user not authenticated');
      }
    };

    initialAuthCheck();
  }, [setIsAuth, navigate]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken); // 디코딩된 토큰 출력
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          setIsAuth(false);
          console.log('Token expired, redirecting to login');
          navigate('/login');
        } else {
          setIsAuth(true);
          console.log('Token valid, user authenticated');
          if (decodedToken.provider === 'kakao') {
            console.log('Kakao user logged in');
          }
        }
      } catch (error) {
        console.error('Invalid token:', error);
        setIsAuth(false);
        navigate('/login');
      }
    } else {
      setIsAuth(false);
      console.log(
        'No token found during pathname change, user not authenticated',
      );
    }
  }, [location.pathname, setIsAuth, navigate]);

  const hideHeader = location.pathname.startsWith('/admin');
  const hideFooter = ['/root/', '/admin'].some((prefix) =>
    location.pathname.startsWith(prefix),
  );

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <ScrollToTop />
        <ToastContainer />
        <div className="flex flex-col min-h-screen w-full">
          {!hideHeader && <Header />}
          <main className="flex-grow mt-30 flex mx-auto w-full justify-center">
            <Outlet />
          </main>
          {!hideFooter && <Footer />}
        </div>
      </DndProvider>
    </>
  );
}

export default App;
