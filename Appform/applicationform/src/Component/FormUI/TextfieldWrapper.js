import React from 'react';
import { TextField } from '@mui/material';
import {useField} from 'formik';

const TextfieldWrapper = ({
    name,
    ...otherProps
}) => {

    const [field, meta, helpers] = useField(name);

  

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
        <TextField value={field.value || ''} fullWidth {...configTextfield}></TextField>
    );
};

export default TextfieldWrapper;

