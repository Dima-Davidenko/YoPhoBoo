import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { fetchUsers } from '../store/operations/users';
import { useMemo } from 'react';

export const useActions = () => {
  const dispatch = useDispatch();
  const actions = useMemo(() => bindActionCreators({ fetchUsers }, dispatch), [dispatch]);
  return actions;
};
