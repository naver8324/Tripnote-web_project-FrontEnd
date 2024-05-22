import { createBrowserRouter } from 'react-router-dom';
import Board from '../pages/Board/BoardPage';
import ErrorPage from '../pages/Error/ErrorPage';
import MainPage from '../pages/Home/MainPage';
import App from '../App';
import MyPage from '../pages/MyPage/MyPage';
import ProfilePage from '../pages/MyPage/ProfilePage';
import RootRecommendationPage from '../pages/MyPage/RootRecommendationPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'board', element: <Board /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'mypage/profile', element: <ProfilePage /> },
      { path: 'root/recommend', element: <RootRecommendationPage /> },
    ],
  },
]);

export default router;
