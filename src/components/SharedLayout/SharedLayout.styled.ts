import styled from '@emotion/styled';
import { ExtendList, List, ListItemButton, ListItemIcon, ListTypeMap } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const AppWrapper = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;
export const StyledHeader = styled.header`
  margin: 0;
  @media screen and (min-width: 768px) {
    margin-right: 20px;
  }
`;

export const StyledList: ExtendList<ListTypeMap<{}, 'ul'>> = styled(List)`
  display: flex;
  width: 100%;
  @media screen and (min-width: 768px) {
    display: block;
    width: 200px;
  }
`;

export const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 35px;
`;

export const StyledListItemButton = styled(ListItemButton)`
  padding: 5px;
  background-color: transparent;
  border-radius: 3px;
  .active & {
    background-color: rgba(69, 118, 211, 0.1);
  }
`;

export const StyledUserMenuWrapper = styled.div`
  flex: 1;
`;

export const StyledNavLink = styled(NavLink)``;
