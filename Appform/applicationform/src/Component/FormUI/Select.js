import React from "react";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useField, useFormikContext } from "formik";

// Options should look like this

// let options = [{
//     label: "any",
//     value: "any"
// }]

const SelectWrapper = ({ name, label, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta, helpers] = useField(name);

  const handleChange = (e) => {
    helpers.setValue(e.target.value);
  };

 
  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    fullWidth: true,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <FormControl fullWidth onChange={handleChange}>
      <InputLabel id={`LabelFor${name}`}>{label}</InputLabel>
      <Select
        labelId={`LabelFor${name}`}
        id={`${name}`}
        value={field.value}
        label={label}
        onChange={(event) => {
     
          setFieldValue(name, event.target.value)
        }}
      >
        {options &&
          options?.length > 0 &&
          options?.map((option) => {
            return (
              <MenuItem value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default SelectWrapper;
