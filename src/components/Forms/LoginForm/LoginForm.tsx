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
} from '@mui/material';
import { useFormik } from 'formik';
import * as React from 'react';
import * as yup from 'yup';
import { useTypedDispatch } from '../../../hooks/useTypedDispatch';
import { logIn } from '../../../redux/auth/authOperations';

interface MyFormValues {
  email: string;
  password: string;
}

const initialValues: MyFormValues = {
  email: '',
  password: '',
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Невірний формат електронної адреси')
    .required("Електронна адреса обов'язкова"),
  password: yup
    .string()
    .min(8, 'Пароль має бути не менше 8 символів')
    .max(20, 'Багато цифр')
    .required("Пароль обов'язковий"),
});

export const LoginForm: React.FC<{}> = () => {
  const dispatch = useTypedDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      dispatch(logIn(values));
      setSubmitting(false);
      resetForm();
    },
    validateOnBlur: true,
  });

  return (
    <Paper sx={{ p: 2, mb: 8, width: '100%' }}>
      <form onSubmit={formik.handleSubmit}>
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
        <Button type="submit" sx={{ display: 'block' }}>
          Увійти
        </Button>
      </form>
    </Paper>
  );
};
