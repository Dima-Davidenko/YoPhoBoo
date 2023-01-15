import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { createAppAsyncThunk } from '../../types/asyncThunkTyped';
import { IContanct, IStoredContact } from '../../types/serverSchemaTypes';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const fetchContacts = createAppAsyncThunk('contacts/fetch', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get<Array<IStoredContact>>(`/contacts`);
    return data;
  } catch (error) {
    const e = error as AxiosError;
    toast.error(`Something went wrong. ${e.message}. Please try later.`);
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const deleteContact = createAppAsyncThunk('contact/delete', async (id: string, thunkAPI) => {
  try {
    const { data } = await axios.delete<IStoredContact>(`/contacts/${id}`);
    toast.success(`Contact ${data.name} deleted!`);
    return data.id;
  } catch (error) {
    const e = error as AxiosError;
    toast.error(`Something went wrong. ${e.message}. Please try later.`);
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const addContact = createAppAsyncThunk(
  'contact/add',
  async (contact: IContanct, thunkAPI) => {
    try {
      const { data } = await axios.post<IStoredContact>('/contacts', contact);
      toast.success(`Contact ${data.name} created!`);
      return data;
    } catch (error) {
      const e = error as AxiosError;
      toast.error(`Something went wrong. ${e.message}. Please try later.`);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateContact = createAppAsyncThunk(
  'contact/update',
  async ({ name, number, id }: IStoredContact, thunkAPI) => {
    const updContact: IContanct = {
      name,
      number,
    };
    try {
      const { data } = await axios.patch<IContanct>(`/contacts/${id}`, updContact);
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
