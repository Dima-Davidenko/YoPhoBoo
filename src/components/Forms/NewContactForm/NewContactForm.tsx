import { Button, Paper, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useTypedDispatch } from '../../../hooks/useTypedDispatch';
import { addContact } from '../../../redux/phonebook/phonebookOperations';
import { selectContacts } from '../../../redux/phonebook/phonebookSelectors';
import { formatPhoneNumber } from '../../../utils/formatPhoneNumber';

interface MyFormValues {
  name: string;
  number: string;
}

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

const initialValues: MyFormValues = { name: '', number: '' };

const NewContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useTypedDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: ({ name, number }, { setSubmitting, resetForm }) => {
      if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
        toast.error('Контакт з таким іменем вже існує');
        setSubmitting(false);
        return;
      }
      resetForm();
      dispatch(addContact({ name, number }));
      setSubmitting(false);
    },
    validateOnBlur: true,
  });

  return (
    <Paper sx={{ p: 2, mb: 8, width: '100%' }}>
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
          onChange={evt => {
            evt.target.value = formatPhoneNumber(evt.target.value);
            formik.handleChange(evt);
          }}
          error={formik.touched.number && Boolean(formik.errors.number)}
          helperText={(formik.touched.number && formik.errors.number) || ' '}
          variant="outlined"
          sx={{ mb: '20px', width: '100%' }}
        />
        <Button type="submit" sx={{ display: 'block' }}>
          Додати до записника
        </Button>
      </form>
    </Paper>
  );
};

export default NewContactForm;
