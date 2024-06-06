import './App.css';
import Footer from './components/ui/Footer';
import Header from './components/ui/Header';
import './index.css';
import { Outlet, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();

  const hideHeader = location.pathname.startsWith('/admin');
  const hideFooter = ['/root/', '/admin'].some(prefix => location.pathname.startsWith(prefix));

  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <div className="flex flex-col min-h-screen w-full">
        {!hideHeader && <Header />}
        <main className="flex-grow mt-30 flex mx-auto w-full justify-center">
          <Outlet />
        </main>
        {!hideFooter && <Footer />}
      </div>
    </>
  );
}

export default App;
