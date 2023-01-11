import { IStore } from '../../types/storeTypes';

export const selectIsLoggedIn = (s: IStore) => {
  return s.auth.isLoggedIn;
};
