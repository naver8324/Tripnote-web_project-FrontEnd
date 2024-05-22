import './App.css';
import Header from './components/ui/Header';
import './index.css';
import { Outlet, RouterProvider } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* <Header />
      <Footer /> */}
      <Outlet />
    </div>
  );
}

export default App;
