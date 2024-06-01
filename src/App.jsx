import './App.css';
import Footer from './components/ui/Footer';
import Header from './components/ui/Header';
import './index.css';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import useAuth from './Hooks/useAuth'; // useAuth 훅 import

function App() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith('/root/');
  const { isAuth, privatePaths, publicPaths } = useAuth();

  // Private Routes
  if (!isAuth && privatePaths.includes(location.pathname)) {
    return <Navigate to="/login" />;
  }

  // Public Routes
  if (isAuth && publicPaths.includes(location.pathname)) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow mt-30 flex mx-auto w-full justify-center">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
