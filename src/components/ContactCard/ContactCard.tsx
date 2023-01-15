import RemoveIcon from '@mui/icons-material/DeleteRounded';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Avatar, Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { deleteContact } from '../../redux/phonebook/phonebookOperations';
import { selectIsLoading } from '../../redux/phonebook/phonebookSelectors';
import { getColorFromName } from '../../utils/getColorFromName';
import { getFirstTwoLetters } from '../../utils/getFirstTwoLetters';
import UpdateContactFormModal from '../Forms/UpdateContactFormModal/UpdateContactFormModal';

interface IContactCard {
  id: string;
  name: string;
  number: string;
}

const ContactCard: React.FC<IContactCard> = ({ id = '', name = '', number = '' }) => {
  const dispatch = useTypedDispatch();
  const isLoading = useSelector(selectIsLoading);
  return (
    <Card elevation={4} sx={{ borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.9)' }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          sx={{
            mr: 2,
            bgcolor: getColorFromName(getFirstTwoLetters(name).toUpperCase()),
            height: 60,
            width: 60,
          }}
        >
          {getFirstTwoLetters(name).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h6">{name}</Typography>
          <Typography>{number}</Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <a href={`tel:+38${number.replace(/[^\d]/g, '')}`} aria-label="call">
          <Avatar sx={{ backgroundColor: '#ba68c8', mr: 1 }}>
            <LocalPhoneIcon />
          </Avatar>
        </a>
        <UpdateContactFormModal id={id} />
        <Button
          variant="contained"
          color="error"
          startIcon={<RemoveIcon />}
          onClick={() => dispatch(deleteContact(id))}
          disabled={isLoading}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default ContactCard;
