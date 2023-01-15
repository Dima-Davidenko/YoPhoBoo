import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { createAppAsyncThunk } from '../../types/asyncThunkTyped';
import {
  IRegisterUser,
  ISignServerResponse,
  IUser,
  IUserLogIn,
} from '../../types/serverSchemaTypes';
import { RootState } from '../store';
axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const setAuthHeader = (token: string | null) => {
  if (!token) return;
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAppAsyncThunk(
  'auth/register',
  async (credentials: IRegisterUser, thunkAPI) => {
    try {
      const { data } = await axios.post<ISignServerResponse>('/users/signup', credentials);
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

export const logIn = createAppAsyncThunk(
  'auth/login',
  async (credentials: IUserLogIn, thunkAPI) => {
    try {
      const { data } = await axios.post<ISignServerResponse>('/users/login', credentials);
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

export const logOut = createAppAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    const e = error as AxiosError;
    toast.error(`Something went wrong. ${e.message}. Please try again.`);
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const refreshUser = createAppAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const persistedToken = state.auth.user.token;
  if (persistedToken === null) {
    return thunkAPI.rejectWithValue('');
  }
  setAuthHeader(persistedToken);
  const toastId = toast.loading('Перевіряємо дані користувача');
  try {
    const { data } = await axios.get<IUser>('/users/current');
    toast.update(toastId, {
      render: `Вітаємо ${data.name}!`,
      type: 'success',
      isLoading: false,
      autoClose: 3000,
    });
    return data;
  } catch (error) {
    const e = error as AxiosError;
    toast.update(toastId, {
      render: `Виникла помилка ${e.message}!`,
      type: 'error',
      isLoading: false,
      autoClose: 3000,
    });
    toast.error(`Something went wrong. ${e.message}. Please try again.`);
    return thunkAPI.rejectWithValue(e.message);
  }
});
