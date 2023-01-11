import { createSlice } from '@reduxjs/toolkit';
import { IPhonebookState } from '../../types/phonebookTypes';
import { addContact, deleteContact, fetchContacts } from './phonebookOperations';

const initialState: IPhonebookState = {
  contacts: [],
  isLoading: false,
  error: null,
};

const setLoadingTrue = (state: IPhonebookState) => {
  state.isLoading = true;
};

const setError = (state: IPhonebookState, action: any) => {
  state.error = action.payload;
};

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, setLoadingTrue)
      .addCase(deleteContact.pending, setLoadingTrue)
      .addCase(addContact.pending, setLoadingTrue)
      .addCase(fetchContacts.rejected, setError)
      .addCase(deleteContact.rejected, setError)
      .addCase(addContact.rejected, setError)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = action.payload;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        const idToDelete = action.payload;
        state.isLoading = false;
        state.error = null;
        state.contacts = state.contacts.filter(({ id }) => id !== idToDelete);
      })
      .addCase(addContact.fulfilled, (state, action) => {
        const newContact = action.payload;
        state.isLoading = false;
        state.error = null;
        state.contacts.push(newContact);
      });
  },
});

export const phonebookReducer = phonebookSlice.reducer;
