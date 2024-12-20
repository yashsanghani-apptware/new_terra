import React, { useState } from "react";
import { TextField } from "@mui/material";

const EINInput = ({ label = "EIN", name = "ein", value, onChange }) => {
  const [error, setError] = useState(false);

  const handleEINChange = (event) => {
    const inputValue = event.target.value;

    // Remove all non-numeric characters
    const numericValue = inputValue.replace(/\D/g, "");

    // Format as XX-XXXXXXX
    let formattedValue = numericValue;
    if (numericValue.length > 2) {
      formattedValue = `${numericValue.slice(0, 2)}-${numericValue.slice(2, 9)}`;
    }

    // Update error state if the number of digits is not 9
    setError(numericValue.length !== 9);

    // Trigger onChange with the formatted value
    if (onChange) {
      onChange({
        target: {
          name,
          value: formattedValue,
        },
      });
    }
  };

  return (
    <TextField
      label={label}
      name={name}
      value={value || ""}
      onChange={handleEINChange}
      variant="standard"
      fullWidth
      error={error}
      helperText={error ? "EIN must follow the format XX-XXXXXXX" : ""}
      inputProps={{
        maxLength: 10, // 9 digits + 1 for the "-" character
      }}
    />
  );
};

export default EINInput;
