import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuth } = useAuth();

  return (
      <Route
          {...rest}
          render={(props) =>
              isAuth ? <Element {...props} /> : <Redirect to="/login" />
          }
      />
  );
};

export default PrivateRoute;
