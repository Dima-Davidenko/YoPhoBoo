import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { Contact } from '../../types/phonebookTypes';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const fetchContacts = createAsyncThunk('contacts/fetch', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(`/contacts`);
    return data as Array<Contact>;
  } catch (error) {
    const e = error as AxiosError;
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const deleteContact = createAsyncThunk('contact/delete', async (id, thunkAPI) => {
  try {
    const response = await axios.delete(`/contacts/${id}`);
    toast.success(`Contact ${response.data.name} deleted!`);
    return response.data.id as string;
  } catch (error) {
    const e = error as AxiosError;
    return thunkAPI.rejectWithValue(e.message);
  }
});
export const addContact = createAsyncThunk('contact/add', async (contact, thunkAPI) => {
  try {
    const response = await axios.post('/contacts', contact);
    toast.success(`Contact ${response.data.name} created!`);
    return response.data as Contact;
  } catch (error) {
    const e = error as AxiosError;
    return thunkAPI.rejectWithValue(e.message);
  }
});
