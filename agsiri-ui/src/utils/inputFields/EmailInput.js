import React, { useState } from "react";
import { TextField } from "@mui/material";

const EmailInput = ({ value, onChange, label = "Email", name = "email", onBlur, emailError, required = false }) => {
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBlur = () => {
    if (!validateEmail(value)) {
      setError("Invalid email format");
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
      onBlur={onBlur || handleBlur}
      error={ !!emailError || !!error}
      helperText={emailError || error}
      type="email"
      required={required}
    />
  );
};

export default EmailInput;
