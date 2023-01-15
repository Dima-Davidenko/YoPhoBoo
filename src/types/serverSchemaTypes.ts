export interface IUser {
  name: string;
  email: string;
}
export interface ISignServerResponse {
  user: IUser;
  token: string;
}

export interface IStoredUser extends IUser {
  id: string;
}
export interface IRegisterUser extends IUser {
  password: string;
}
export interface IUserLogIn {
  email: string;
  password: string;
}

export interface IContanct {
  name: string;
  number: string;
}
export interface IStoredContact extends IContanct {
  id: string;
}
