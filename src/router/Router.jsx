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
import CheckedPasswordPage from '../pages/login/CheckedPasswordPage';
import AgreePage from '../pages/login/AgreePage';
import LoginPage from '../pages/login/LoginPage';
import EditBoardPage from '../pages/Board/EditBoardPage';
import PostPage from '../pages/Board/PostPage';
import { PrivateRoute, PublicRoute } from '../Hooks/useAuth';
import FindPassword from '../pages/login/FindPasswordPage';
import KakaoRedirect from '../pages/login/KakaoRedirect';
import AdminPage from '../pages/AdminPage/AdminPage.jsx';
import AdminLogin from '../pages/login/AdminLogin.jsx';
import SocialProfilePage from '../pages/MyPage/SocialProfilePage.jsx';

// import KakaoCallback from '../Hooks/user/KakaoCallback';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      {
        element: <PublicRoute />,
        children: [
          { path: '/api/member/kakao/login', element: <KakaoRedirect /> },

          { path: 'login', element: <LoginPage /> },
          { path: 'agree', element: <AgreePage /> },
          { path: 'signup', element: <SignupPage /> },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          { path: 'mypage', element: <MyPage /> },
          { path: 'mypage/profile', element: <ProfilePage /> },
          { path: 'mypage/socialprofile', element: <SocialProfilePage /> },

          { path: 'mypage/checkedpassword', element: <CheckedPasswordPage /> },
          { path: 'post/:postId', element: <PostPage /> },
          { path: 'admin', element: <AdminPage /> },
        ],
      },
      { path: 'findpassword', element: <FindPassword /> },
      { path: 'board', element: <Board /> },
      { path: 'root/recommend', element: <RootRecommendationPage /> },
      { path: 'root/create', element: <RootCreatePage /> },
      { path: 'editBoard', element: <EditBoardPage /> },
      { path: 'admin/login', element: <AdminLogin /> },
    ],
  },
]);

export default router;
