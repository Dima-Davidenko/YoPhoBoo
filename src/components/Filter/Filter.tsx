import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { updateFilter } from '../../redux/filters/contactFilterSlice';

export const Filter: React.FC = () => {
  const dispatch = useTypedDispatch();
  const [value, setValue] = useState('');

  return (
    <TextField
      InputLabelProps={{ disableAnimation: true, shrink: true }}
      id="outlined-basic"
      label="Знайти по імені"
      variant="outlined"
      size="small"
      value={value}
      onChange={({ target }) => {
        setValue(target.value);
        dispatch(updateFilter(target.value.toLowerCase()));
      }}
    />
  );
};

export default Filter;
