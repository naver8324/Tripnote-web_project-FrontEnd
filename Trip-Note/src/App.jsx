import './App.css';
import Footer from './components/ui/Footer';
import Header from './components/ui/Header';
import './index.css';
import { Outlet, RouterProvider } from 'react-router-dom';

function App() {
  return (
    <div className='flex flex-col min-h-screen w-full'>
      <Header />
      <main className='flex-grow mt-30 flex mx-auto'>
      <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
