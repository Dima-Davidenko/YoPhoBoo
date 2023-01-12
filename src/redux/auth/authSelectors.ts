import { IRootState } from '../../types/storeTypes';

export const selectIsLoggedIn = (s: IRootState) => {
  return s.auth.isLoggedIn;
};
export const selectIsRefreshing = (s: IRootState) => {
  return s.auth.isRefreshing;
};

export const selectToken = (s: IRootState) => {
  return s.auth.user.token;
};

export const selectUserName = (s: IRootState) => {
  return s.auth.user.name;
};
