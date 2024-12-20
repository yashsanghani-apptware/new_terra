import React, { useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PhoneNumber from "@/utils/inputFields/PhoneNumber";
import EmailInput from "@/utils/inputFields/EmailInput";
import TextInput from "@/utils/inputFields/TextInput";
import { formatDateForInput } from "@/utils/format/FormatDate";
import { useTranslation } from "react-i18next";
import { validateEmail, validatePhoneNumber } from "@/utils/validations/validate";

const UserProfile = ({
  userProfileFormValues,
  setUserProfileFormValues,
  handleSave,
}) => {
  const { t } = useTranslation("common");

  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserProfileFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handlePhoneBlur = () => {
    if (!validatePhoneNumber(userProfileFormValues.phone_number)) {
      setPhoneError(t("PHONE_VALIDATION_ERROR"));
    } else {
      setPhoneError("");
    }
  };
  const handleEmailBlur = () => {
    if (!validateEmail(userProfileFormValues.email_address)) {
      setEmailError(t("INVALID_EMAIL_FORMAT"));
    } else {
      setEmailError("");
    }
  };
  const validateBeforeSave = () => {
    if (phoneError || emailError) {
      return true;
    }
    return false;
  }
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
          <Typography variant="h5" gutterBottom style={{ marginTop: 0 }}>
            {t("USER_PROFILE")}
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                label={t("FIRST_NAME")}
                name="first_name"
                value={userProfileFormValues.first_name}
                onChange={handleChange}
                required={true}
                validateOnBlur={true}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                label={t("LAST_NAME")}
                name="last_name"
                value={userProfileFormValues.last_name}
                onChange={handleChange}
                required={true}
                validateOnBlur={true}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <EmailInput
                label={t("EMAIL_ADDRESS")}
                name="email_address"
                value={userProfileFormValues.email_address}
                onChange={handleChange}
                onBlur={handleEmailBlur}
                emailError={emailError}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <PhoneNumber
                label={t("PHONE_NUMBER")}
                name="phone_number"
                value={userProfileFormValues.phone_number}
                onChange={handleChange}
                onBlur={handlePhoneBlur}
                phoneError={phoneError}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t("DATE_OF_BIRTH")}
                variant="standard"
                fullWidth
                type="date"
                name="date_of_birth"
                value={
                  userProfileFormValues.date_of_birth
                    ? formatDateForInput(userProfileFormValues.date_of_birth)
                    : ""
                }
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                label={t("STREET_ADDRESS")}
                name="street_address"
                value={userProfileFormValues.street_address || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                label={t("ADDRESS_LOCALITY")}
                name="address_locality"
                value={userProfileFormValues.address_locality || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                label={t("ADDRESS_REGION")}
                name="address_region"
                value={userProfileFormValues.address_region || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                label={t("POSTAL_CODE")}
                name="postal_code"
                value={userProfileFormValues.postal_code || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                label={t("COUNTRY")}
                name="address_country"
                value={userProfileFormValues.address_country || ""}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>

        <div className="btn-save-next">
          <span
            className={`btn btn-gradient btn-pill ${
              validateBeforeSave() ? "disabled" : ""
            }`}
            onClick={!validateBeforeSave() ? handleSave : null}
            style={{
              pointerEvents: validateBeforeSave() ? "none" : "auto", // Prevent clicks if disabled
              opacity: validateBeforeSave() ? 0.6 : 1, // Visual cue for disabled state
            }}
          >
            {t("SAVE")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
