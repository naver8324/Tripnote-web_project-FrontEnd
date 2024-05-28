import { createBrowserRouter } from 'react-router-dom';
import Board from '../pages/Board/BoardPage';
import ErrorPage from '../pages/Error/ErrorPage';
import MainPage from '../pages/Home/MainPage';
import App from '../App';
import MyPage from '../pages/MyPage/MyPage';
import ProfilePage from '../pages/MyPage/ProfilePage';
import RootRecommendationPage from '../pages/RootRecommendationPage';
import RootCreatePage from '../pages/RootCreatePage';
import SignupPage from '../pages/login/SignupPage';
import FindPasswordPage from '../pages/login/FindPasswordPage';
import AgreePage from '../pages/login/AgreePage';
import LoginPage from '../pages/login/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'agree', element: <AgreePage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'findPassword', element: <FindPasswordPage /> },
      { path: 'board', element: <Board /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'mypage/profile', element: <ProfilePage /> },
      { path: 'root/recommend', element: <RootRecommendationPage /> },
      { path: 'root/create', element: <RootCreatePage /> },
    ],
  },
]);

export default router;
