import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { toast } from "react-toastify";
import { updateData } from "@/utils/postData";
import { BASE_URL } from "@/config/apiBaseUrls";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordForm = ({ userDetails }) => {
  const [formValues, setFormValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.currentPassword)
      newErrors.currentPassword = "Current password is required.";
    if (!formValues.newPassword)
      newErrors.newPassword = "New password is required.";
    if (formValues.newPassword === formValues.currentPassword)
      newErrors.newPassword =
        "New password cannot be the same as the current password.";
    if (formValues.newPassword !== formValues.confirmNewPassword)
      newErrors.confirmNewPassword = "Passwords do not match.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const payload = {
      current_password: formValues.currentPassword,
      new_password: formValues.newPassword,
    };

    try {
      const response = await updateData(
        payload,
        `${BASE_URL.POLICY}/users/${userDetails._id}/change_password`
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Password changed successfully!");
        setFormValues({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else {
        toast.error(response.data.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="dashboard-content">
      <div className="editor-wrapper">
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          {/* Title */}
          <Typography variant="h5" sx={{ mb: 2 }} style={{ marginTop: 0 }}>
            Change Password
          </Typography>

          {/* Form Fields */}
          <Grid container spacing={2}>
            {/* Current Password */}
            <Grid size={{ xs: 12, md: 12 }}>
              <TextField
                label="Current Password"
                name="currentPassword"
                type={showPasswords.currentPassword ? "text" : "password"}
                value={formValues.currentPassword}
                onChange={handleChange}
                fullWidth
                error={Boolean(errors.currentPassword)}
                helperText={errors.currentPassword}
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility("currentPassword")}
                        edge="end"
                      >
                        {showPasswords.currentPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* New Password */}
            <Grid size={{ xs: 12, md: 12 }}>
              <TextField
                label="New Password"
                name="newPassword"
                type={showPasswords.newPassword ? "text" : "password"}
                value={formValues.newPassword}
                onChange={handleChange}
                fullWidth
                error={Boolean(errors.newPassword)}
                helperText={errors.newPassword}
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility("newPassword")}
                        edge="end"
                      >
                        {showPasswords.newPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Confirm New Password */}
            <Grid size={{ xs: 12, md: 12 }}>
              <TextField
                label="Confirm New Password"
                name="confirmNewPassword"
                type={showPasswords.confirmNewPassword ? "text" : "password"}
                value={formValues.confirmNewPassword}
                onChange={handleChange}
                fullWidth
                error={Boolean(errors.confirmNewPassword)}
                helperText={errors.confirmNewPassword}
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          togglePasswordVisibility("confirmNewPassword")
                        }
                        edge="end"
                      >
                        {showPasswords.confirmNewPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Submit Button */}
        <div className="btn-save-next" style={{ marginRight: "10px" }}>
          <span className="btn btn-gradient btn-pill" onClick={handleSubmit}>
            Change Password
          </span>
        </div>
      </div>
    </div>
  );
};

export default PasswordForm;
