import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../../operations/users';
import { UserState } from '../../types/user';

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.rejected, (state, action) => {
        state.users = [];
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
      });
  },
});

export const userReducer = usersSlice.reducer;

/* export const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_USERS_PENDING:
      return {
        users: [],
        loading: true,
        error: null,
      };
    case UserActionTypes.FETCH_USERS_SUCCESS:
      return {
        users: [...action.payload],
        loading: false,
        error: null,
      };
    case UserActionTypes.FETCH_USERS_ERROR:
      return {
        users: [],
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
 */
