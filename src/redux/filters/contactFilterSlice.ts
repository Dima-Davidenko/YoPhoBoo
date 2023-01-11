import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFiltersState } from '../../types/filtersTypes';

const initialState: IFiltersState = {
  contactFilter: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    update: (_, action: PayloadAction<string>) => {
      return { contactFilter: action.payload };
    },
  },
});

export const { update: updateFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
