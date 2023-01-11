import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';
import UserMenu from '../UserMenu/UserMenu';

const SharedLayout: React.FC = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header>
      {isLoggedIn ? (
        <>
          <UserMenu />
          <NavLink to="/phonebook">Phonebook</NavLink>
          <Outlet />
        </>
      ) : (
        <>
          <NavLink to="/registration">Registration</NavLink>
          <NavLink to="/">Login</NavLink>
          <Outlet />
        </>
      )}
    </header>
  );
};

export default SharedLayout;
