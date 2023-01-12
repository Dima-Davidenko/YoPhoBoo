import { Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { logOut } from '../../redux/auth/authOperations';
import { selectUserName } from '../../redux/auth/authSelectors';
import { Greetings, UserName, Wrapper } from './UserMenu.styled';

const UserMenu: React.FC = () => {
  const dispatch = useTypedDispatch();
  const userName = useSelector(selectUserName);
  return (
    <Wrapper>
      <Greetings>
        Вітаємо, <UserName>{userName}</UserName>
      </Greetings>
      <Button sx={{ mb: 2 }} size="small" onClick={() => dispatch(logOut())} variant="outlined">
        Вийти
      </Button>
    </Wrapper>
  );
};

export default UserMenu;
