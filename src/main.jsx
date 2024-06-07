import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/Router.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './pages/Error/ErrorPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>,
);
