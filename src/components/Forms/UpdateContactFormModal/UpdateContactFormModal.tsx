import EditIcon from '@mui/icons-material/EditRounded';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useTypedDispatch } from '../../../hooks/useTypedDispatch';
import { updateContact } from '../../../redux/phonebook/phonebookOperations';
import { selectContacts, selectIsLoading } from '../../../redux/phonebook/phonebookSelectors';
import { IContanct } from '../../../types/serverSchemaTypes';
import { formatPhoneNumber } from '../../../utils/formatPhoneNumber';

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

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Має бути трошки довше :)')
    .required('Нажаль без імені нічого не вийде'),
  number: yup
    .string()
    .matches(
      /\([0-9]{3}\)[ .-][0-9]{3}[ .-][0-9]{2}[ .-][0-9]{2}/,
      'Невірний формат. Має бути (066) 333-22-22'
    )
    .max(15, 'Невірний формат. Має бути (066) 333-22-22')
    .required("Номер телефону також обов'язковий"),
});

interface IProps {
  id: string;
}

const UpdateContactFormModal: React.FC<IProps> = ({ id }) => {
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const { name: oldName, number: oldNumber } = contacts.find(
    contact => contact.id === id
  ) as IContanct;
  const dispatch = useTypedDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const formik = useFormik({
    initialValues: {
      name: oldName,
      number: oldNumber,
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: ({ name, number }, { setSubmitting, resetForm }) => {
      if (number !== oldNumber && contacts.some(contact => contact.number === number)) {
        toast.error('Контакт з таким номером вже існує');
        setSubmitting(false);
        return;
      }
      resetForm();
      dispatch(updateContact({ id, name, number }));
      setSubmitting(false);
      setOpen(false);
    },
    validateOnBlur: true,
  });
  const formatNumber = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    evt.target.value = formatPhoneNumber(evt.target.value);
    formik.handleChange(evt);
  };

  return (
    <>
      <Button
        variant="contained"
        aria-label="edit"
        disabled={isLoading}
        color="primary"
        startIcon={<EditIcon />}
        onClick={handleOpen}
      >
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              InputLabelProps={{ disableAnimation: true, shrink: true }}
              fullWidth
              id="name"
              name="name"
              label="Ім'я"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={(formik.touched.name && formik.errors.name) || ' '}
              variant="outlined"
              sx={{ mb: '20px', width: '100%' }}
            />
            <TextField
              InputLabelProps={{ disableAnimation: true, shrink: true }}
              fullWidth
              id="number"
              name="number"
              label="Номер телефону"
              type="text"
              value={formik.values.number}
              onChange={formatNumber}
              error={formik.touched.number && Boolean(formik.errors.number)}
              helperText={(formik.touched.number && formik.errors.number) || ' '}
              variant="outlined"
              sx={{ mb: '20px', width: '100%' }}
            />
            <Button type="submit" sx={{ display: 'block' }}>
              Змінити
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};
export default UpdateContactFormModal;
