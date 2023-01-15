import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../../redux/auth/authSelectors';

const ProtectedRoute: React.FC<React.PropsWithChildren<{ defaultRoute: string }>> = ({
  children,
  defaultRoute,
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return <>{isLoggedIn ? <Navigate to={defaultRoute} /> : children}</>;
};

export default ProtectedRoute;
