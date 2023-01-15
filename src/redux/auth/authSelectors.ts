import { RootState } from '../store';

export const selectIsLoggedIn = (s: RootState) => {
  return s.auth.isLoggedIn;
};
export const selectIsRefreshing = (s: RootState) => {
  return s.auth.isRefreshing;
};

export const selectToken = (s: RootState) => {
  return s.auth.user.token;
};

export const selectUserName = (s: RootState) => {
  return s.auth.user.name;
};

export const selectUser = (s: RootState) => {
  return s.auth.user;
};
