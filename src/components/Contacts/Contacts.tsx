import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/phonebook/phonebookSelectors';
import ContactCard from '../ContactCard/ContactCard';
import css from './Contacts.module.scss';

const Contacts: React.FC = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
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
