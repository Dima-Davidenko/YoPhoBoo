import { Paper } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import PrimarySearchAppBar from '../PrimarySearchAppBar/PrimarySearchAppBar';

const SharedLayout: React.FC = () => {
  return (
    <div>
      <PrimarySearchAppBar />
      <Paper className="viewContainer">
        <Outlet />
      </Paper>
    </div>
  );
};

export default SharedLayout;
