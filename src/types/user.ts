export interface UserState {
  users: any[];
  loading: boolean;
  error: null | string;
}

export enum UserActionTypes {
  FETCH_USERS_PENDING = 'FETCH_USERS_PENDING',
  FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
  FETCH_USERS_ERROR = 'FETCH_USERS_ERROR',
}

interface FetchUsersPendingAction {
  type: UserActionTypes.FETCH_USERS_PENDING;
}

interface FetchUsersSuccessAction {
  type: UserActionTypes.FETCH_USERS_SUCCESS;
  payload: any[];
}

interface FetchUsersErrorAction {
  type: UserActionTypes.FETCH_USERS_ERROR;
  payload: string;
}

export type UserAction = FetchUsersPendingAction | FetchUsersErrorAction | FetchUsersSuccessAction;
