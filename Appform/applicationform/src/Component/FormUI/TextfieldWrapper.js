import React from 'react';
import { TextField } from '@mui/material';
import {useField} from 'formik';

const TextfieldWrapper = ({
    name,
    ...otherProps
}) => {

    const [field, meta, helpers] = useField(name);

    const handleChange = (e) => {
        helpers.setValue(e.target.value);
      };

    const configTextfield = {
        ...field,
        ...otherProps,
        variant: 'outlined',
        
    };

    if (meta && meta.touched && meta.error) {
        configTextfield.error = true;
        configTextfield.helperText = meta.error;
    }

    return (
        <TextField onChange = {handleChange} fullWidth {...configTextfield}></TextField>
    );
};

export default TextfieldWrapper;

