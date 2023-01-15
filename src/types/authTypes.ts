export interface IAuthState {
  user: {
    name: string;
    email: string;
    token: string;
  };
  isLoggedIn: boolean;
  isRefreshing: boolean;
}
