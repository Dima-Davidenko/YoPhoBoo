import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { Contact } from '../../types/phonebookTypes';
import {
  IServerContactsDeleteRes,
  IServerContactsGetRes,
  IServerContactsIDPatchRes,
  IServerContactsIDPatchSchema,
  IServerContactsPostRes,
  IServerContactsPostSchema,
} from '../../types/serverSchemaTypes';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const fetchContacts = createAsyncThunk('contacts/fetch', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get<IServerContactsGetRes>(`/contacts`);
    return data;
  } catch (error) {
    const e = error as AxiosError;
    toast.error(`Something went wrong. ${e.message}. Please try later.`);
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const deleteContact = createAsyncThunk('contact/delete', async (id: string, thunkAPI) => {
  try {
    const { data } = await axios.delete<IServerContactsDeleteRes>(`/contacts/${id}`);
    toast.success(`Contact ${data.name} deleted!`);
    return data.id;
  } catch (error) {
    const e = error as AxiosError;
    toast.error(`Something went wrong. ${e.message}. Please try later.`);
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const addContact = createAsyncThunk(
  'contact/add',
  async (contact: IServerContactsPostSchema, thunkAPI) => {
    try {
      const { data } = await axios.post<IServerContactsPostRes>('/contacts', contact);
      toast.success(`Contact ${data.name} created!`);
      return data;
    } catch (error) {
      const e = error as AxiosError;
      toast.error(`Something went wrong. ${e.message}. Please try later.`);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  'contact/update',
  async ({ name, number, id }: Contact, thunkAPI) => {
    const updContact: IServerContactsIDPatchSchema = {
      name,
      number,
    };
    try {
      const { data } = await axios.patch<IServerContactsIDPatchRes>(`/contacts/${id}`, updContact);
      toast.success(`Contact ${data.name} updated!`);
      const updatedContact = {
        name: data.name,
        number: data.number,
        id,
      };
      return updatedContact;
    } catch (error) {
      const e = error as AxiosError;
      toast.error(`Something went wrong. ${e.message}. Please try later.`);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
