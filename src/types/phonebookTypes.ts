import { IStoredContact } from './serverSchemaTypes';

export interface IPhonebookState {
  contacts: Array<IStoredContact>;
  isLoading: boolean;
  error: string;
}
