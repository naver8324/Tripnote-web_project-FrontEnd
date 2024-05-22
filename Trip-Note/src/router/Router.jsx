import { createBrowserRouter } from 'react-router-dom';
import Board from '../pages/Board/BoardPage';
import ErrorPage from '../pages/Error/ErrorPage';
import MainPage from '../pages/Home/MainPage';
// import Layout from '../pages/Layout/Layout';
import App from '../App';
import MyPage from '../pages/MyPage/MyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'board', element: <Board /> },
      { path: 'mypage', element: <MyPage /> },
    ],
  },
]);

export default router;
