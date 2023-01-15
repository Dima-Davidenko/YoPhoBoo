import { createSlice } from '@reduxjs/toolkit';
import { IPhonebookState } from '../../types/phonebookTypes';
import { addContact, deleteContact, fetchContacts, updateContact } from './phonebookOperations';

const initialState: IPhonebookState = {
  contacts: [],
  isLoading: false,
  error: '',
};

const setLoadingTrue = (state: IPhonebookState) => {
  state.isLoading = true;
  state.error = '';
};

const setError = (state: IPhonebookState, action: any) => {
  state.isLoading = false;
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
      .addCase(updateContact.pending, setLoadingTrue)
      .addCase(fetchContacts.rejected, setError)
      .addCase(deleteContact.rejected, setError)
      .addCase(addContact.rejected, setError)
      .addCase(updateContact.rejected, setError)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.contacts = action.payload;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        const idToDelete = action.payload;
        state.isLoading = false;
        state.error = '';
        state.contacts = state.contacts.filter(({ id }) => id !== idToDelete);
      })
      .addCase(addContact.fulfilled, (state, action) => {
        const newContact = action.payload;
        state.isLoading = false;
        state.error = '';
        state.contacts.push(newContact);
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const { name, number, id } = action.payload;
        state.isLoading = false;
        state.error = '';
        const index = state.contacts.findIndex(contact => contact.id === id);
        state.contacts[index] = { id, name, number };
      });
  },
});

export const phonebookReducer = phonebookSlice.reducer;
