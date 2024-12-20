import React from "react";
import {
  Switch,
  FormControlLabel,
  FormGroup,
  Checkbox,
  TextField,
} from "@mui/material";
import TextInput from "@/utils/inputFields/TextInput"; // Assuming a reusable text input component
import PhoneNumber from "@/utils/inputFields/PhoneNumber"; // Reusable phone number component
import EmailInput from "@/utils/inputFields/EmailInput"; // Reusable email input component
import SocialSecurityNumberField from "@/utils/inputFields/SocialSecurityNumberField"; // Reusable SSN component
import EINInput from "@/utils/inputFields/EINInput"; // Reusable EIN input component
import Grid from "@mui/material/Grid2";
import { formatDateForInput } from "@/utils/format/FormatDate";

const RenderBeneficiaryForm = ({
  beneficiaryRole,
  beneficiaryData,
  handleInputChange,
  handleAddressChange,
  handleNonUsChange,
  handleEntityChange,
  handleTrustChange,
  handleSSNChange,
  handleCheckboxChange,
  handleEINCheckboxChange,
}) => {
  const renderAddressFields = () => (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextInput
          label="Street"
          name="street"
          value={beneficiaryData.address.street}
          onChange={handleAddressChange}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextInput
          label="Locality"
          name="locality"
          value={beneficiaryData.address.locality}
          onChange={handleAddressChange}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextInput
          label="Region"
          name="region"
          value={beneficiaryData.address.region}
          onChange={handleAddressChange}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextInput
          label="Postal Code"
          name="postalCode"
          value={beneficiaryData.address.postalCode}
          onChange={handleAddressChange}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextInput
          label="Country"
          name="country"
          value={beneficiaryData.address.country}
          onChange={handleAddressChange}
        />
      </Grid>
    </>
  );

  const renderForm = () => {
    switch (beneficiaryRole) {
      case "us-person":
        return (
          <>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="First Name"
                  name="firstName"
                  value={beneficiaryData.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="Last Name"
                  name="lastName"
                  value={beneficiaryData.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <EmailInput
                  label="Email"
                  name="email"
                  value={beneficiaryData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Date of Birth"
                  name="dateOfBirth"
                  value={beneficiaryData.dateOfBirth ? formatDateForInput(beneficiaryData.dateOfBirth) : ""}
                  type="date"
                  variant="standard"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <PhoneNumber
                  label="Phone Number"
                  name="phone"
                  value={beneficiaryData.phone}
                  onChange={handleInputChange}
                />
              </Grid>
              {renderAddressFields()}
              <Grid size={{ xs: 12, md: 6 }}>
                <SocialSecurityNumberField
                  label="Social Security Number"
                  name="socialSecurityNumber"
                  fieldvalue={beneficiaryData.socialSecurityNumber}
                  onChange={handleSSNChange}
                />
              </Grid>
            </Grid>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={beneficiaryData.acceptTermsAndConditions}
                    onChange={handleCheckboxChange}
                  />
                }
                label="I have read and agreed to the terms of the Transfer on Death (TOD) Beneficiary Agreement."
              />
            </FormGroup>
          </>
        );

      case "non-us-person":
        return (
          <>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="First Name"
                  name="firstName"
                  value={beneficiaryData.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="Last Name"
                  name="lastName"
                  value={beneficiaryData.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <EmailInput
                  label="Email"
                  name="email"
                  value={beneficiaryData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Date of Birth"
                  name="dateOfBirth"
                  value={beneficiaryData.dateOfBirth ? formatDateForInput(beneficiaryData.dateOfBirth) : ""}
                  type="date"
                  variant="standard"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <PhoneNumber
                  label="Phone Number"
                  name="phone"
                  value={beneficiaryData.phone}
                  onChange={handleInputChange}
                />
              </Grid>
              {renderAddressFields()}
              <Grid size={{ xs: 12, md: 6 }}>
                <SocialSecurityNumberField
                  label="Social Security Number"
                  name="socialSecurityNumber"
                  fieldvalue={beneficiaryData.socialSecurityNumber}
                  onChange={handleSSNChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="Country of Citizenship"
                  name="countryOfCitizenship"
                  value={
                    beneficiaryData.nonUSPersonDetails.countryOfCitizenship
                  }
                  onChange={handleNonUsChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="Country of Residency"
                  name="countryOfResidency"
                  value={
                    beneficiaryData.nonUSPersonDetails.countryOfResidency
                  }
                  onChange={handleNonUsChange}
                />
              </Grid>
            </Grid>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={beneficiaryData.acceptTermsAndConditions} // Bind state to checkbox
                    onChange={handleCheckboxChange} // Handle state updates
                  />
                }
                label="I have read and agreed to the terms of the Transfer on Death (TOD) Beneficiary Agreement."
              />
            </FormGroup>
          </>
        );

      case "entities":
        return (
          <>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="Signatory First Name"
                  name="firstName"
                  value={beneficiaryData.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="Signatory Last Name"
                  name="lastName"
                  value={beneficiaryData.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="Signatory Title"
                  name="signatoryTitle"
                  value={beneficiaryData.entityDetails.signatoryTitle}
                  onChange={handleEntityChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="Signatory Email"
                  name="email"
                  value={beneficiaryData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Date of Formation"
                  name="dob"
                  type="date"
                  value={beneficiaryData.dateOfBirth ? formatDateForInput(beneficiaryData.dateOfBirth) : ""}
                  variant="standard"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <PhoneNumber
                  label="Business Phone"
                  name="phone"
                  value={beneficiaryData.phone}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="Entity Name"
                  name="entityName"
                  value={beneficiaryData.entityDetails.entityName}
                  onChange={handleEntityChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="Entity Type"
                  name="entityType"
                  value={beneficiaryData.entityDetails.entityType}
                  onChange={handleEntityChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <EINInput
                  label="Entity EIN"
                  name="ein"
                  value={beneficiaryData.entityDetails.ein}
                  onChange={handleEntityChange}
                />
              </Grid>
              {renderAddressFields()}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="Entity Jursdriction"
                  name="apartment"
                  value={beneficiaryData.entityDetails.entityJurisdiction}
                  onChange={handleEntityChange}
                />
              </Grid>
            </Grid>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={beneficiaryData.acceptTermsAndConditions} // Bind state to checkbox
                    onChange={handleCheckboxChange} // Handle state updates
                  />
                }
                label="I have read and agreed to the terms of the Transfer on Death (TOD) Beneficiary Agreement."
              />
            </FormGroup>
          </>
        );

      case "trust":
        return (
          <>
            <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="Trustee First Name"
                  name="firstName"
                  value={beneficiaryData.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="Trust Type"
                  name="trustType"
                  value={beneficiaryData.trustDetails.trustType}
                  onChange={handleTrustChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="Trustee Last Name"
                  name="lastName"
                  value={beneficiaryData.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="Trust Name"
                  name="trustName"
                  value={beneficiaryData.trustDetails.trustName}
                  onChange={handleTrustChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="Trustee Email"
                  name="email"
                  value={beneficiaryData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <SocialSecurityNumberField
                  label="SSN or ITIN"
                  name="socialSecurityNumber"
                  fieldvalue={beneficiaryData.socialSecurityNumber}
                  onChange={handleSSNChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Date of Formation"
                  name="dateOfFormation"
                  type="date"
                  variant="standard"
                  value={beneficiaryData.trustDetails.dateOfFormation ? formatDateForInput(beneficiaryData.trustDetails.dateOfFormation) : ""}

                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <PhoneNumber
                  label="Phone Number"
                  name="phone"
                  value={beneficiaryData.phone}
                  onChange={handleInputChange}
                />
              </Grid>
              {renderAddressFields()}
              <Grid size={{ xs: 12, md: 12 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={beneficiaryData.trustDetails.isEIN}
                      onChange={handleEINCheckboxChange}
                    />
                  }
                  label="Does this trust have EIN?"
                />
              </Grid>
              {beneficiaryData.trustDetails.isEIN && (
                <Grid size={{ xs: 12, md: 6 }}>
                  <EINInput
                    label="Trust EIN"
                    name="trustEIN"
                    value={beneficiaryData.trustDetails.trustEIN}
                    onChange={handleTrustChange}
                  />
                </Grid>
              )}
            </Grid>
          </>
        );

      default:
        return null;
    }
  };

  return <>{renderForm()}</>;
};

export default RenderBeneficiaryForm;
