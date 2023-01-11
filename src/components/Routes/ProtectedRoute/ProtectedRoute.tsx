import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../../redux/auth/authSelectors';

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/phonebook');
    }
  }, [isLoggedIn, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
