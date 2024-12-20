import React, { useState } from "react";
import { TextField } from "@mui/material";

const PhoneNumber = ({
  value,
  onChange,
  label = "Phone Number",
  name = "phone_number",
  onBlur,
  phoneError
}) => {
  const [error, setError] = useState("");

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Ensures exactly 10 digits
    return phoneRegex.test(phone);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Allow only numbers and limit to 10 digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 10) {
      onChange(e); // Propagate the change to parent
    }
  };

  const handleBlur = () => {
    if (!validatePhoneNumber(value)) {
      setError("Phone number must be exactly 10 digits");
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
      onChange={handleInputChange}
      onBlur={onBlur || handleBlur}
      error={!!phoneError || !!error}
      helperText={phoneError || error}
    />
  );
};

export default PhoneNumber;
