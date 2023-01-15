import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import fakeContacts from '../../assets/fakeContacts.json';
import { addContact } from '../../redux/phonebook/phonebookOperations';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const FakeContactsCreate: React.FC = () => {
  const dispatch = useTypedDispatch();
  const [open, setOpen] = React.useState(false);
  const createFakeContacts = () => {
    setOpen(false);
    fakeContacts.forEach(contact => dispatch(addContact(contact)));
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        aria-label="create contact"
        onClick={handleOpen}
        sx={{ m: 2 }}
      >
        Додати до записника фейкові контакти (для тестування)
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>
            До Ваших контактів будут додані автоматично сгенеровані контакти, Ви впевнені?
          </Typography>
          <Button onClick={createFakeContacts}>Так</Button>
        </Box>
      </Modal>
    </>
  );
};

export default FakeContactsCreate;
