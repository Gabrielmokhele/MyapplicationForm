import React from 'react';
import { useField } from 'formik';
import { TextField } from '@mui/material';

const DateTimePickerWrapper = ({
  name,
  ...otherProps
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (date) => {
    helpers.setValue(date);
  };

  const configDateTimePicker = {
    ...field,
    ...otherProps,
    type: 'date',
    variant: 'outlined',
    fullWidth: true,
    InputLabelProps: {
      shrink: true
    }
  };

  if(meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }


  return (
      <TextField
      onChange={(e) => handleChange(e.target.value)}
      {...configDateTimePicker}
    />
   
    
  );
};
export default DateTimePickerWrapper;












