export interface IUser {
  name: null | string;
  email: null | string;
  token: null | string;
}

export interface ICredentials {
  email: string;
  password: string;
  name?: string;
}

export interface IAuthState {
  user: IUser;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}
