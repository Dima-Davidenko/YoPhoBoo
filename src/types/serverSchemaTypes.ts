export interface IServerCurrentGetRes {
  name: string;
  email: string;
}
export interface IServerUsersSignupPostRes {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export interface IServerUsersSignupPostSchema {
  name: string;
  email: string;
  password: string;
}

export interface IServerUsersLoginPostRes {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
export interface IServerUsersLoginPostSchema {
  email: string;
  password: string;
}

export interface IServerContactsPostSchema {
  name: string;
  number: string;
}

export interface IServerContactsIDPatchSchema {
  name: string;
  number: string;
}

export interface IServerContactsIDPatchRes {
  name: string;
  number: string;
}
export interface IServerContactsPostRes {
  id: string;
  name: string;
  number: string;
}
export interface IServerContactsDeleteRes {
  id: string;
  name: string;
  number: string;
}
export type IServerContactsGetRes = Array<IServerContactsPostRes>;

/* export interface IServerSignupError400 {
  driver: boolean;
  name: string;
  index: number;
  code: number;
  keyPattern: {
    email: number;
  };
  keyValue: {
    email: string;
  };
} */
