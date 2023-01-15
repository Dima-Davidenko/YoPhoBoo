import React from 'react';
import Contacts from '../../components/Contacts/Contacts';
import NewContactForm from '../../components/Forms/NewContactForm/NewContactForm';

const Phonebook: React.FC = () => {
  return (
    <div style={{ width: '100%' }}>
      <NewContactForm />
      <Contacts />
    </div>
  );
};

export default Phonebook;
