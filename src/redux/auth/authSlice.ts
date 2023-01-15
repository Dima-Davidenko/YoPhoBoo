import { createSlice } from '@reduxjs/toolkit';
import { IAuthState } from '../../types/authTypes';
import { logIn, logOut, refreshUser, register } from './authOperations';

const initialState: IAuthState = {
  user: {
    name: '',
    email: '',
    token: '',
  },
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = { ...action.payload.user, token: action.payload.token };
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = { ...action.payload.user, token: action.payload.token };
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, () => {
        return initialState;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = { ...action.payload, token: state.user.token };
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
        state.user.token = '';
      });
  },
});

export const authReducer = authSlice.reducer;
