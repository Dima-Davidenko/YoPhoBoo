import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICredentials, IUser } from '../../types/authTypes';
import { IStore } from '../../types/storeTypes';
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
  async (credentials: ICredentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', credentials);
      const user = response.data as IUser;
      setAuthHeader(user.token);
      return user;
    } catch (error) {
      const e = error as AxiosError;
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logIn = createAsyncThunk('auth/login', async (credentials: ICredentials, thunkAPI) => {
  try {
    const response = await axios.post('/users/login', credentials);
    const user = response.data as IUser;
    setAuthHeader(user.token);
    return user;
  } catch (error) {
    const e = error as AxiosError;
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    const e = error as AxiosError;
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as IStore;
  const persistedToken = state.auth.user.token;
  if (persistedToken === null) {
    return thunkAPI.rejectWithValue(null);
  }
  setAuthHeader(persistedToken);
  try {
    const response = await axios.get('/users/current');
    const user = response.data as IUser;
    return user;
  } catch (error) {
    const e = error as AxiosError;
    return thunkAPI.rejectWithValue(e.message);
  }
});
