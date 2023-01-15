import React from 'react';
import css from './Home.module.scss';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';

const Home: React.FC = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  return (
    <div className={css.wrapper}>
      <Typography color="primary" variant="h4" align="center">
        Вітаємо у нашому додатку для збереження контактів{' '}
        <Typography component="div" fontSize={40} variant="button">
          YoPhoBoo
        </Typography>
      </Typography>
      <Box display="flex" justifyContent="center" mt="20px">
        {isLoggedIn ? (
          <Button variant="contained" onClick={() => navigate('/phonebook')}>
            Перейти до записника
          </Button>
        ) : (
          <>
            <Button variant="contained" onClick={() => navigate('/login')}>
              Увійти
            </Button>
            <Divider variant="middle" orientation="vertical" flexItem sx={{ mx: 2 }} />
            <Button variant="outlined" onClick={() => navigate('/registration')}>
              Реєстрація
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

export default Home;
