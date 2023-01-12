import { IAuthState } from './authTypes';
import { IFiltersState } from './filtersTypes';
import { IPhonebookState } from './phonebookTypes';

export interface IRootState {
  auth: IAuthState;
  phonebook: IPhonebookState;
  filters: IFiltersState;
}
