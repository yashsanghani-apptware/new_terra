import React, { useEffect, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SocialSecurityNumberField = ({ label, name, fieldvalue, onChange }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [showSSN, setShowSSN] = useState(false);

  useEffect(() => {
    if (fieldvalue !== "") {
      setValue(fieldvalue);
    }
  }, [fieldvalue]);

  const formatSSN = (input) => {
    // Remove any non-numeric characters
    const sanitized = input.replace(/\D/g, "");
    // Format as xxx-xx-xxxx
    if (sanitized.length <= 3) return sanitized;
    if (sanitized.length <= 5)
      return `${sanitized.slice(0, 3)}-${sanitized.slice(3)}`;
    return `${sanitized.slice(0, 3)}-${sanitized.slice(3, 5)}-${sanitized.slice(5, 9)}`;
  };

  const validateSSN = (ssn) => {
    const ssnRegex = /^\d{3}-\d{2}-\d{4}$/; // Valid SSN format: xxx-xx-xxxx
    if (!ssnRegex.test(ssn)) {
      return "Invalid Social Security Number format. Example: 123-45-6789.";
    }
    return "";
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const formattedValue = formatSSN(inputValue);
    setValue(formattedValue);

    // Perform validation
    const validationError = validateSSN(formattedValue);
    setError(validationError);

    // Pass the valid SSN to the parent component if onChange is provided
    if (!validationError && onChange) {
      onChange(formattedValue);
    }
  };

  const toggleShowSSN = () => {
    setShowSSN((prevShow) => !prevShow);
  };

  return (
    <TextField
      label={label || "Social Security Number"}
      name={name}
      variant="standard"
      fullWidth
      value={value}
      onChange={handleInputChange}
      error={Boolean(error)}
      helperText={error || ""}
      inputProps={{ maxLength: 11 }} // Limit input length to 11 (formatted as xxx-xx-xxxx)
      type={showSSN ? "text" : "password"} // Toggle between text and password types
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={toggleShowSSN} edge="end">
              {showSSN ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SocialSecurityNumberField;