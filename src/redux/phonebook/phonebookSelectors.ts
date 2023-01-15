import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectContacts = (s: RootState) => s.phonebook.contacts;
export const selectIsLoading = (s: RootState) => s.phonebook.isLoading;
export const selectFilter = (s: RootState) => s.filters.contactFilter;
export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => contacts.filter(({ name }) => name.toLowerCase().includes(filter))
);
