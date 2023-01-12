import { createSelector } from '@reduxjs/toolkit';
import { IRootState } from '../../types/storeTypes';

export const selectContacts = (s: IRootState) => s.phonebook.contacts;
export const selectIsLoading = (s: IRootState) => s.phonebook.isLoading;
export const selectFilter = (s: IRootState) => s.filters.contactFilter;
export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => contacts.filter(({ name }) => name.toLowerCase().includes(filter))
);
