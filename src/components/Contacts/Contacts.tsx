import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { fetchContacts } from '../../redux/phonebook/phonebookOperations';
import { selectFilteredContacts } from '../../redux/phonebook/phonebookSelectors';
import ContactCard from '../ContactCard/ContactCard';
import css from './Contacts.module.scss';

const Contacts: React.FC = () => {
  const dispatch = useTypedDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <ul className={css.contactList}>
      {[...filteredContacts].reverse().map(({ id, name, number }) => (
        <li key={id}>
          <ContactCard id={id} name={name} number={number} />
        </li>
      ))}
    </ul>
  );
};

export default Contacts;
