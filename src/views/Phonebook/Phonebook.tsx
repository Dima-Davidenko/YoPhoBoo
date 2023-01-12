import React from 'react';
import Contacts from '../../components/Contacts/Contacts';
import Filter from '../../components/Filter/Filter';
import NewContactForm from '../../components/Forms/NewContactForm/NewContactForm';

const Phonebook: React.FC = () => {
  return (
    <div style={{ width: '100%' }}>
      <NewContactForm />
      <Contacts>
        <Filter />
      </Contacts>
    </div>
  );
};

export default Phonebook;
