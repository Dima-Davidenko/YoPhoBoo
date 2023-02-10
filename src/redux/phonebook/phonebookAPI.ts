import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IContanct, IStoredContact } from '../../types/serverSchemaTypes';
import { RootState } from '../store';

export const phonebookAPI = createApi({
  reducerPath: 'phonebookAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    prepareHeaders: (headers, api) => {
      const state = api.getState() as RootState;
      const token = state.auth.user.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getContacts: builder.query<Array<IStoredContact>, void>({
      query: () => `/contacts`,
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Contacts' as const, id })), 'Contacts']
          : ['Contacts'],
    }),
    addContact: builder.mutation<IStoredContact, IContanct>({
      query: contact => ({ url: '/contacts', method: 'POST', body: contact }),
      invalidatesTags: ['Contacts'],
    }),
    editContact: builder.mutation<IStoredContact, IStoredContact>({
      query: ({ id, name, number }) => ({
        url: `/contacts/${id}`,
        method: 'PATCH',
        body: { name, number },
      }),
      invalidatesTags: (_, _2, arg) => [{ type: 'Contacts', id: arg.id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetContactsQuery, useAddContactMutation, useEditContactMutation } = phonebookAPI;
