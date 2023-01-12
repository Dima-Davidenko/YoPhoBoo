import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import {
  IServerCurrentGetRes,
  IServerUsersLoginPostRes,
  IServerUsersLoginPostSchema,
  IServerUsersSignupPostSchema,
  IServerUsersSignupPostRes,
} from '../../types/serverSchemaTypes';
import { IRootState } from '../../types/storeTypes';
axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const setAuthHeader = (token: string | null) => {
  if (!token) return;
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: IServerUsersSignupPostSchema, thunkAPI) => {
    try {
      const { data } = await axios.post<IServerUsersSignupPostRes>('/users/signup', credentials);
      setAuthHeader(data.token);
      toast.success(`Nice to meet you ${data.user.name}!`);
      return data;
    } catch (error) {
      const e = error as AxiosError;
      toast.error(`Please use another email adress.`);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials: IServerUsersLoginPostSchema, thunkAPI) => {
    try {
      const { data } = await axios.post<IServerUsersLoginPostRes>('/users/login', credentials);
      setAuthHeader(data.token);
      toast.success(`Nice to see you again, ${data.user.name}!`);
      return data;
    } catch (error) {
      const e = error as AxiosError;
      toast.error(`Wrong email or password. Please try again.`);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    const e = error as AxiosError;
    toast.error(`Something went wrong. ${e.message}. Please try again.`);
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as IRootState;
  const persistedToken = state.auth.user.token;
  if (persistedToken === null) {
    return thunkAPI.rejectWithValue(null);
  }
  setAuthHeader(persistedToken);
  try {
    const { data } = await axios.get<IServerCurrentGetRes>('/users/current');
    toast.success(`You entered in system like ${data.name}!`);
    return data;
  } catch (error) {
    const e = error as AxiosError;
    toast.error(`Something went wrong. ${e.message}. Please try again.`);
    return thunkAPI.rejectWithValue(e.message);
  }
});
