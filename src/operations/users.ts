import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = createAsyncThunk('users/fetch', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get('/users');
    return data;
  } catch (error) {
    const e = error as AxiosError;
    thunkAPI.rejectWithValue(e.message);
  }
});
/* export const fetchUsers = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.FETCH_USERS_PENDING });
      const { data } = await axios.get('/users');
      dispatch({ type: UserActionTypes.FETCH_USERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: UserActionTypes.FETCH_USERS_ERROR, payload: 'An Error occured' });
    }
  };
};
 */
