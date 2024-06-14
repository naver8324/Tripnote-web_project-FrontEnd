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

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { memberInfo, loading, error } = useMemberInfo();
  const { setIsAuth } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await memberInfo();
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
        navigate('/login');
      }
    };

    checkAuth();
  }, [location.pathname]);

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
