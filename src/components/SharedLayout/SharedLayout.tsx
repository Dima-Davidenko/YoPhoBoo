import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import { ListItemText, ListSubheader } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';
import UserMenu from '../UserMenu/UserMenu';
import {
  AppWrapper,
  StyledHeader,
  StyledList,
  StyledListItemButton,
  StyledListItemIcon,
  StyledNavLink,
  StyledUserMenuWrapper,
} from './SharedLayout.styled';

const SharedLayout: React.FC = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <AppWrapper>
      <StyledHeader>
        <StyledList
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Меню
            </ListSubheader>
          }
        >
          {isLoggedIn ? (
            <StyledUserMenuWrapper>
              <UserMenu />
              <StyledNavLink style={{ textDecoration: 'none', color: 'inherit' }} to="/phonebook">
                <StyledListItemButton>
                  <StyledListItemIcon>
                    <SendIcon />
                  </StyledListItemIcon>
                  <ListItemText primary="Записник" />
                </StyledListItemButton>
              </StyledNavLink>
            </StyledUserMenuWrapper>
          ) : (
            <>
              <StyledNavLink
                style={{ textDecoration: 'none', color: 'inherit' }}
                to="/registration"
              >
                <StyledListItemButton>
                  <StyledListItemIcon>
                    <SendIcon />
                  </StyledListItemIcon>
                  <ListItemText primary="Реєстрація" />
                </StyledListItemButton>
              </StyledNavLink>
              <StyledNavLink style={{ textDecoration: 'none', color: 'inherit' }} to="/">
                <StyledListItemButton>
                  <StyledListItemIcon>
                    <DraftsIcon />
                  </StyledListItemIcon>
                  <ListItemText primary="Увійти" />
                </StyledListItemButton>
              </StyledNavLink>
            </>
          )}
        </StyledList>
      </StyledHeader>
      <Outlet />
    </AppWrapper>
  );
};

export default SharedLayout;
