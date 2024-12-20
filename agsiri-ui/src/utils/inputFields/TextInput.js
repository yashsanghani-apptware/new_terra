import React, { useState } from "react";
import { TextField } from "@mui/material";

const TextInput = ({
  label,
  value,
  onChange,
  name,
  required = false,
  maxLength = null,
  helperText = "",
  validateOnBlur = false,
}) => {
  const [error, setError] = useState("");

  const handleBlur = () => {
    if (required && !value) {
      setError(`${label} is required`);
    } else if (maxLength && value?.length > maxLength) {
      setError(`${label} cannot exceed ${maxLength} characters`);
    } else {
      setError("");
    }
  };

  return (
    <TextField
      label={label}
      variant="standard"
      fullWidth
      name={name}
      value={value}
      onChange={onChange}
      onBlur={validateOnBlur ? handleBlur : null}
      error={!!error}
      helperText={error || helperText}
    />
  );
};

export default TextInput;
