import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useTypedDispatch } from '../../../hooks/useTypedDispatch';
import { register } from '../../../redux/auth/authOperations';

interface MyFormValues {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

const initialValues: MyFormValues = {
  name: '',
  email: '',
  password: '',
  confirm: '',
};

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zа-яA-ZА-Яіє'ї ]+$/, "Ім'я має складатися лише з символів")
    .min(3, "Ім'я має бути не менше 3 символів")
    .max(30, "Ім'я має бути не довше 30 символів")
    .required("Ім'я обов'язкове"),
  email: yup
    .string()
    .email('Невірний формат електронної адреси')
    .required("Електронна адреса обов'язкова"),
  password: yup
    .string()
    .min(8, 'Пароль має бути не менше 8 символів')
    .max(20, 'Багато цифр')
    .required("Пароль обов'язковий"),
  confirm: yup
    .string()
    .required('Підтвердіть пароль')
    .oneOf([yup.ref('password'), null], 'Введені паролі відрізняються'),
});

export const RegisterForm: React.FC<{}> = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const { name, email, password } = values;
      dispatch(register({ name, email, password }));
      setSubmitting(false);
    },
    validateOnBlur: true,
  });

  return (
    <Paper
      sx={{
        p: 2,
        mb: 8,
        ml: 'auto',
        mr: 'auto',
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.9)',
        maxWidth: 500,
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          InputLabelProps={{ disableAnimation: true, shrink: true }}
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
          id="email"
          name="email"
          label="Електронна адреса"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={(formik.touched.email && formik.errors.email) || ' '}
          variant="outlined"
          sx={{ mb: '20px', width: '100%' }}
        />
        <FormControl sx={{ mb: 2, width: '100%' }} variant="outlined">
          <InputLabel
            error={formik.touched.password && Boolean(formik.errors.password)}
            disableAnimation
            shrink
            htmlFor="password"
          >
            Пароль
          </InputLabel>
          <OutlinedInput
            notched
            fullWidth
            id="password"
            name="password"
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            aria-describedby="password-helper-text"
            onChange={evt => {
              formik.handleChange(evt);
            }}
            error={formik.touched.password && Boolean(formik.errors.password)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(show => !show)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {formik.touched.password && formik.errors.password ? (
            <FormHelperText
              error={formik.touched.password && Boolean(formik.errors.password)}
              id="password-helper-text"
            >
              {formik.errors.password}
            </FormHelperText>
          ) : (
            <FormHelperText id="password-helper-text"> </FormHelperText>
          )}
        </FormControl>
        <FormControl sx={{ mb: 2, width: '100%' }} variant="outlined">
          <InputLabel
            error={formik.touched.confirm && Boolean(formik.errors.confirm)}
            disableAnimation
            shrink
            htmlFor="confirm"
          >
            Підтвердження пароля
          </InputLabel>
          <OutlinedInput
            notched
            fullWidth
            id="confirm"
            name="confirm"
            label="Підтвердження пароля"
            type={showConfirm ? 'text' : 'password'}
            value={formik.values.confirm}
            aria-describedby="confirm-helper-text"
            onChange={formik.handleChange}
            error={formik.touched.confirm && Boolean(formik.errors.confirm)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm visibility"
                  onClick={() => setShowConfirm(show => !show)}
                  edge="end"
                >
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {formik.touched.confirm && formik.errors.confirm ? (
            <FormHelperText
              error={formik.touched.confirm && Boolean(formik.errors.confirm)}
              id="confirm-helper-text"
            >
              {formik.errors.confirm}
            </FormHelperText>
          ) : (
            <FormHelperText id="confirm-helper-text"> </FormHelperText>
          )}
        </FormControl>
        <Button type="submit" variant="outlined" sx={{ display: 'block' }}>
          Зареєструватися
        </Button>
      </form>
      <Typography>
        Маєте обліковий запис? <Button onClick={() => navigate('/login')}>Увійти</Button>
      </Typography>
    </Paper>
  );
};

export default RegisterForm;
