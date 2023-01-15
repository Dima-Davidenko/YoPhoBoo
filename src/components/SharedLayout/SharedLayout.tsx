import { Paper } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import backdrop from '../../assets/backdrop.svg';
import PrimarySearchAppBar from '../PrimarySearchAppBar/PrimarySearchAppBar';

const SharedLayout: React.FC = () => {
  return (
    <div>
      <PrimarySearchAppBar />
      <Paper
        sx={{
          backgroundImage: `url('${backdrop}')`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="viewContainer"
      >
        <Outlet />
      </Paper>
    </div>
  );
};

export default SharedLayout;
