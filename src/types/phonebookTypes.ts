export type Contact = {
  id: string;
  name: string;
  number: string;
};

export interface IPhonebookState {
  contacts: Array<Contact>;
  isLoading: boolean;
  error: null | string;
}
