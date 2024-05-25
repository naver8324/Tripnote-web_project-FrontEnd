import './App.css';
import Footer from './components/ui/Footer';
import Header from './components/ui/Header';
import './index.css';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith('/root/');

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow mt-30 flex mx-auto">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
