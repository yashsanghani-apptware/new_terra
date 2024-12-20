import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid2";
import TextInput from "@/utils/inputFields/TextInput";
import EmailInput from "@/utils/inputFields/EmailInput";
import PhoneNumber from "@/utils/inputFields/PhoneNumber";
import SocialSecurityNumberField from "@/utils/inputFields/SocialSecurityNumberField";
import { toast } from "react-toastify";
import { createData, updateData } from "@/utils/postData";
import { BASE_URL } from "@/config/apiBaseUrls";
import { formatDateForInput } from "@/utils/format/FormatDate";

const IndividualAccountForm = ({ userDetails, setEditMode, accounts }) => {
  const [jointTenantExpanded, setJointTenantExpanded] = useState(false);
  const [differentAddressExpanded, setDifferentAddressExpanded] =
    useState(false);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    socialSecurityNumber: "",
    concentAndDiscloses: false,
    certify: false,
    address: {
      street: "",
      locality: "",
      region: "",
      postalCode: "",
      country: "",
    },
    jointHolderDetails: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      socialSecurityNumber: "",
    },
    differentAddress: {
      street: "",
      locality: "",
      region: "",
      postalCode: "",
      country: "",
    },
  });
  const [accountPresent, setAccountPresent] = useState(false);
  useEffect(() => {
    if (accounts && accounts.length > 0) {
      accounts.forEach((account) => {
        if (account.accountType === "Individual") {
          // Update the form values with account details
          setFormValues((prevFormValues) => ({
            ...prevFormValues,
            ...account.details,
          }));
          setAccountPresent(account._id);
        }
      });
    }
  }, [accounts]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSSNChange = (value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      socialSecurityNumber: value,
    }));
  };

  const handleJointTenantSSnChange = (value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      jointHolderDetails: {
        ...prevValues.jointHolderDetails,
        socialSecurityNumber: value,
      },
    }));
  };

  const handleAddressChange = (event, type = "address") => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [name]: value,
      },
    }));
  };

  const handleJointTenantChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      jointHolderDetails: {
        ...prev.jointHolderDetails,
        [field]: value,
      },
    }));
  };
  const handleDifferentAddressChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      differentAddress: {
        ...prev.differentAddress,
        [field]: value,
      },
    }));
  };
  const handleCheckboxChange = (event, field) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: event.target.checked,
    }));
  };
  const handleSubmit = async () => {
    const payload = {
      accountType: "Individual",
      details: {
        ...formValues,
        isJoint: jointTenantExpanded,
        jointHolderDetails: formValues.jointHolderDetails,
        differentAddress: formValues.differentAddress,
      },
    };
    try {
      let response;
      if (accountPresent) {
        response = await updateData(
          payload,
          `${BASE_URL.POLICY}/users/${userDetails._id}/accounts/${accountPresent}`
        );
      } else {
        response = await createData(
          payload,
          `${BASE_URL.POLICY}/users/${userDetails._id}/accounts`
        );
      }
      if (response.status == 200 || response.status == 201) {
        toast.success("Account created successfully!");
      } else {
        toast.error("Failed to create account.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Typography variant="h5">Individual Account</Typography>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        An individual or joint tenant account
      </Typography>

      {/* Main Form Fields */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="First Name"
            name="firstName"
            value={formValues.firstName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Last Name"
            name="lastName"
            value={formValues.lastName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <EmailInput
            label="Email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PhoneNumber
            label="Phone Number"
            name="phone"
            value={formValues.phone}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            value={formValues.dateOfBirth ? formatDateForInput(formValues.dateOfBirth) : ""}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SocialSecurityNumberField
            label="SSN or ITIN"
            name="socialSecurityNumber"
            fieldvalue={formValues.socialSecurityNumber}
            onChange={handleSSNChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Street Address"
            name="street"
            value={formValues.address.street}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Locality"
            name="locality"
            value={formValues.address.locality}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Region"
            name="region"
            value={formValues.address.region}
            onChange={handleAddressChange}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Postal Code"
            name="postalCode"
            value={formValues.address.postalCode}
            onChange={handleAddressChange}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Country"
            name="country"
            value={formValues.address.country}
            onChange={handleAddressChange}
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>

      {/* Joint Tenant Section */}
      <Box sx={{ mt: 3 }}>
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => setJointTenantExpanded(!jointTenantExpanded)}
        >
          <ExpandMoreIcon
            sx={{
              transform: jointTenantExpanded
                ? "rotate(180deg)"
                : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          />
          <Typography variant="subtitle1">
            I want to invest as joint tenants with Right of survivorship (Both
            must sign)
          </Typography>
        </Box>
        <Collapse in={jointTenantExpanded}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                label="First Name"
                name="firstName"
                value={formValues.jointHolderDetails.firstName}
                onChange={(e) =>
                  handleJointTenantChange("firstName", e.target.value)
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                label="Last Name"
                name="lastName"
                value={formValues.jointHolderDetails.lastName}
                onChange={(e) =>
                  handleJointTenantChange("lastName", e.target.value)
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <EmailInput
                label="Email"
                name="email"
                value={formValues.jointHolderDetails.email}
                onChange={(e) =>
                  handleJointTenantChange("email", e.target.value)
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <PhoneNumber
                label="Phone Number"
                name="phone"
                value={formValues.jointHolderDetails.phone}
                onChange={(e) =>
                  handleJointTenantChange("phone", e.target.value)
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Date of Birth"
                name="dateOfBirth"
                value={formValues.jointHolderDetails.dateOfBirth ? formatDateForInput(formValues.jointHolderDetails.dateOfBirth) : ""}
                onChange={(e) =>
                  handleJointTenantChange("dateOfBirth", e.target.value)
                }
                fullWidth
                variant="standard"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <SocialSecurityNumberField
                label="SSN or ITIN"
                name="socialSecurityNumber"
                fieldvalue={formValues?.jointHolderDetails?.socialSecurityNumber}
                onChange={handleJointTenantSSnChange}
              />
            </Grid>
          </Grid>
        </Collapse>
      </Box>

      {/* Different Address Section */}
      <Box sx={{ mt: 3 }}>
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => setDifferentAddressExpanded(!differentAddressExpanded)}
        >
          <ExpandMoreIcon
            sx={{
              transform: differentAddressExpanded
                ? "rotate(180deg)"
                : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          />
          <Typography variant="subtitle1">
            Address for delivery and notices is different from above
          </Typography>
        </Box>
        <Collapse in={differentAddressExpanded}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                label="Street Address"
                name="street"
                value={formValues.differentAddress.street}
                onChange={(event) => handleDifferentAddressChange("street", event.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                label="Locality"
                name="locality"
                value={formValues.differentAddress.locality}
                onChange={(event) => handleDifferentAddressChange("locality", event.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                label="Region"
                name="region"
                value={formValues.differentAddress.region}
                onChange={(event) => handleDifferentAddressChange("region", event.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                label="Postal Code"
                name="postalCode"
                value={formValues.differentAddress.postalCode}
                onChange={(event) => handleDifferentAddressChange("postalCode", event.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                label="Country"
                name="country"
                value={formValues.differentAddress.country}
                onChange={(event) => handleDifferentAddressChange("country", event.target.value)}
              />
            </Grid>
          </Grid>
        </Collapse>
      </Box>

      {/* Checkboxes */}
      <FormControlLabel
        control={
          <Checkbox
            checked={formValues.concentAndDiscloses}
            onChange={(event) =>
              handleCheckboxChange(event, "concentAndDiscloses")
            }
          />
        }
        label="I consent to and have read disclosures for electronic delivery of my Schedule K-1"
        sx={{ mt: 3 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formValues.certify}
            onChange={(event) => handleCheckboxChange(event, "certify")}
          />
        }
        label={`Under penalties of perjury, I certify that: 
        1. The number shown on this form is my correct taxpayer identification number (or I am waiting for a number to be issued to me); and 
        2. I am a U.S. person (as defined in Rule 902 (k) of Securities Act of 1933)`}
      />

      <Box sx={{ mt: 3, display: "flex" }}>
        <div className="btn-save-next" style={{ marginRight: "10px" }}>
          <span
            className="btn btn-gradient btn-pill"
            onClick={() => handleSubmit()}
          >
            Save
          </span>
        </div>
        <div className="btn-save-next">
          <span
            className="btn back-btn-gradient btn-pill"
            onClick={() => setEditMode(null)}
          >
            Back
          </span>
        </div>
      </Box>
    </>
  );
};

export default IndividualAccountForm;
