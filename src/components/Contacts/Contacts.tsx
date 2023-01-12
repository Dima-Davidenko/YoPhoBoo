import DeleteIcon from '@mui/icons-material/Delete';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { deleteContact, fetchContacts } from '../../redux/phonebook/phonebookOperations';
import { selectFilteredContacts, selectIsLoading } from '../../redux/phonebook/phonebookSelectors';
import UpdateContactFormModal from '../Forms/UpdateContactFormModal/UpdateContactFormModal';

const Contacts: React.FC<React.PropsWithChildren> = ({ children }) => {
  const dispatch = useTypedDispatch();
  const isLoading = useSelector(selectIsLoading);
  const filteredContacts = useSelector(selectFilteredContacts);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <Paper sx={{ p: 2, mb: 8, width: '100%' }}>
      {children}
      <Grid item xs={12} md={6}>
        <List sx={{ maxWidth: '500px' }}>
          {[...filteredContacts].reverse().map(({ id, name, number }) => (
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => dispatch(deleteContact(id))}
                  disabled={isLoading}
                >
                  <DeleteIcon />
                </IconButton>
              }
              key={id}
            >
              <a href={`tel:+38${number.replace(/[^\d]/g, '')}`} aria-label="call">
                <IconButton
                  aria-label="call"
                  disabled={isLoading}
                  sx={{ display: 'block', width: '43px', height: '43px' }}
                >
                  <LocalPhoneIcon />
                </IconButton>
              </a>
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  paddingLeft: '5px',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  color: 'inherit',
                  width: '100%',
                }}
              >
                <div>
                  <ListItemText primary={`${name}`} />
                  <ListItemText primary={`${number}`} />
                </div>
                <UpdateContactFormModal id={id} />
              </div>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Paper>
  );
};

export default Contacts;
