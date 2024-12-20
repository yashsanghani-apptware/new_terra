import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Switch,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Collapse from "@mui/material/Collapse";
import TextInput from "@/utils/inputFields/TextInput";
import PhoneNumber from "@/utils/inputFields/PhoneNumber";
import EINInput from "@/utils/inputFields/EINInput";
import SocialSecurityNumberField from "@/utils/inputFields/SocialSecurityNumberField";
import { toast } from "react-toastify";
import { formatDateForInput } from "@/utils/format/FormatDate";
import { createData, updateData } from "@/utils/postData";
import { BASE_URL } from "@/config/apiBaseUrls";
import EmailInput from "@/utils/inputFields/EmailInput";

const TrustAccountForm = ({ setEditMode, userDetails, accounts }) => {
  const [trustDetails, setTrustDetails] = useState({
    firstName: "",
    lastName: "",
    trustDetails: {
      trustType: "",
      trustName: "",
      hasEIN: false,
      ein: "",
      trusteeIsGrantor: false,
      grantors: [],
      hasMultipleGrantors: false,
      deliveryAddressDifferent: false,
      deliveryAddress: {
        street: "",
        locality: "",
        region: "",
        postalCode: "",
        country: "",
      },
    },
    email: "",
    socialSecurityNumber: "",
    dateOfBirth: "",
    phone: "",
    address: {
      street: "",
      locality: "",
      region: "",
      postalCode: "",
      country: "",
    },
    concentAndDiscloses: false,
  });

  const [accountPresent, setAccountPresent] = useState(false);

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      accounts.forEach((account) => {
        if (account.accountType === "Trust") {
          // Update the form values with account details
          setTrustDetails((prevFormValues) => ({
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
    setTrustDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleTrusDetailsInputChange = (event) => {
    const { name, value } = event.target;
    setTrustDetails((prev) => ({
      ...prev,
      trustDetails: {
        ...prev.trustDetails,
        [name]: value,
      },
    }));
  };
  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setTrustDetails((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleDeliveryAddressChange = (event) => {
    const { name, value } = event.target;
    setTrustDetails((prev) => ({
      ...prev,
      trustDetails: {
        ...prev.trustDetails,
        deliveryAddress: {
          ...prev.trustDetails.deliveryAddress,
          [name]: value,
        },
      },
    }));
  };

  const handleCheckboxChange = (event, field) => {
    setTrustDetails((prevValues) => ({
      ...prevValues,
      [field]: event.target.checked,
    }));
  };
  const handleSSNChange = (value) => {
    setTrustDetails((prevValues) => ({
      ...prevValues,
      socialSecurityNumber: value,
    }));
  };
  const handleGrantorAddressChange = (e, field, index) => {
    setTrustDetails((prev) => {
      const updatedGrantors = [...prev.trustDetails.grantors];
      updatedGrantors[index].address = {
        ...updatedGrantors[index].address, // Preserve existing address fields
        [field]: e.target.value, // Update the specific field
      };
      return {
        ...prev,
        trustDetails: {
          ...prev.trustDetails,
          grantors: updatedGrantors,
        },
      };
    });
  };
  const handleSaveAndSubmit = async () => {
    const payload = {
      accountType: "Trust",
      details: trustDetails,
    };
    try {
      let response;
      if (accountPresent) {
        response = await updateData(
          payload,
          `${BASE_URL.POLICY}/users/${userDetails._id}/accounts/${accountPresent}`
        );
        if (response.status == 200 || response.status == 201) {
          toast.success("Trust Account updated");
        } else {
          console.error("Failed to create account");
        }
      } else {
        response = await createData(
          payload,
          `${BASE_URL.POLICY}/users/${userDetails._id}/accounts`
        );

        if (response.status == 200 || response.status == 201) {
          toast.success("Trust Account created");
        } else {
          console.error("Failed to create account");
        }
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <>
      <Typography variant="h5">Trust Account</Typography>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Provide details for the Trust Account.
      </Typography>

      <Grid container spacing={2}>
        {/* Trustee Details */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Trustee First Name"
            name="firstName"
            value={trustDetails.firstName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Trustee Last Name"
            name="lastName"
            value={trustDetails.lastName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Trust Type"
            name="trustType"
            value={trustDetails.trustDetails.trustType}
            onChange={handleTrusDetailsInputChange}
            select
            options={["Revocable", "Irrevocable"]}
            variant="standard"
            fullWidth
          >
            <MenuItem value="Revocable">Revocable</MenuItem>
            <MenuItem value="Irrevocable">Irrevocable</MenuItem>
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Trust Name"
            name="trustName"
            value={trustDetails.trustDetails.trustName}
            onChange={handleTrusDetailsInputChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Trustee Email"
            name="email"
            value={trustDetails.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SocialSecurityNumberField
            label="SSN or ITIN"
            name="socialSecurityNumber"
            fieldvalue={trustDetails.socialSecurityNumber}
            onChange={handleSSNChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            value={
              trustDetails.dateOfBirth
                ? formatDateForInput(trustDetails.dateOfBirth)
                : ""
            }
            onChange={handleInputChange}
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PhoneNumber
            label="Business Phone"
            name="phone"
            value={trustDetails.phone}
            onChange={handleInputChange}
          />
        </Grid>

        {/* Trust Address */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Street"
            name="street"
            value={trustDetails.address.street}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Locality"
            name="locality"
            value={trustDetails.address.locality}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Region"
            name="region"
            value={trustDetails.address.region}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Postal Code"
            name="postalCode"
            value={trustDetails.address.postalCode}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Country"
            name="country"
            value={trustDetails.address.country}
            onChange={handleAddressChange}
          />
        </Grid>
      </Grid>

      {/* Toggles */}
      <Box sx={{ mt: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={trustDetails.trustDetails.hasEIN}
              onChange={(e) =>
                setTrustDetails((prev) => ({
                  ...prev,
                  trustDetails: {
                    ...prev.trustDetails,
                    hasEIN: e.target.checked,
                  },
                }))
              }
            />
          }
          label="Does this trust have an EIN?"
        />
        {trustDetails.trustDetails.hasEIN && (
          <Grid size={{ xs: 12, md: 6 }} sx={{ mt: 2 }}>
            <EINInput
              label="Trust EIN"
              name="ein"
              value={trustDetails.trustDetails.ein}
              onChange={handleTrusDetailsInputChange}
            />
          </Grid>
        )}
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControlLabel
            control={
              <Switch
                checked={trustDetails.trustDetails.trusteeIsGrantor}
                onChange={(e) =>
                  setTrustDetails((prev) => ({
                    ...prev,
                    trustDetails: {
                      ...prev.trustDetails,
                      trusteeIsGrantor: e.target.checked,
                    },
                  }))
                }
              />
            }
            label="Are the Trustee and Grantor the same person?"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControlLabel
            control={
              <Switch
                checked={trustDetails.trustDetails.hasMultipleGrantors}
                onChange={(e) =>
                  setTrustDetails((prev) => ({
                    ...prev,
                    trustDetails: {
                      ...prev.trustDetails,
                      hasMultipleGrantors: e.target.checked,
                    },
                  }))
                }
              />
            }
            label="Does Trust have more than one grantor?"
          />
        </Grid>
        <Collapse in={trustDetails.trustDetails.hasMultipleGrantors}>
          {trustDetails.trustDetails.grantors &&
            trustDetails.trustDetails.grantors.map((grantor, index) => (
              <Fragment key={index}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Grantor #{index + 1}
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextInput
                      label="Grantor First Name"
                      name="firstName"
                      value={grantor.firstName || ""}
                      onChange={(e) =>
                        setTrustDetails((prev) => {
                          const updatedGrantors = [
                            ...prev.trustDetails.grantors,
                          ];
                          updatedGrantors[index].firstName = e.target.value;
                          return {
                            ...prev,
                            trustDetails: {
                              ...prev.trustDetails,
                              grantors: updatedGrantors,
                            },
                          };
                        })
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextInput
                      label="Grantor Last Name"
                      name="lastName"
                      value={grantor.lastName || ""}
                      onChange={(e) =>
                        setTrustDetails((prev) => {
                          const updatedGrantors = [
                            ...prev.trustDetails.grantors,
                          ];
                          updatedGrantors[index].lastName = e.target.value;
                          return {
                            ...prev,
                            trustDetails: {
                              ...prev.trustDetails,
                              grantors: updatedGrantors,
                            },
                          };
                        })
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <EmailInput
                      label="Email"
                      name="email"
                      value={grantor.email || ""}
                      onChange={(e) =>
                        setTrustDetails((prev) => {
                          const updatedGrantors = [
                            ...prev.trustDetails.grantors,
                          ];
                          updatedGrantors[index].email = e.target.value;
                          return {
                            ...prev,
                            trustDetails: {
                              ...prev.trustDetails,
                              grantors: updatedGrantors,
                            },
                          };
                        })
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <PhoneNumber
                      label="Phone"
                      name="phone"
                      value={grantor.phone || ""}
                      onChange={(e) =>
                        setTrustDetails((prev) => {
                          const updatedGrantors = [
                            ...prev.trustDetails.grantors,
                          ];
                          updatedGrantors[index].phone = e.target.value;
                          return {
                            ...prev,
                            trustDetails: {
                              ...prev.trustDetails,
                              grantors: updatedGrantors,
                            },
                          };
                        })
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <SocialSecurityNumberField
                      label="SSN or ITIN"
                      name="ssnOrItin"
                      fieldvalue={grantor.ssnOrItin}
                      onChange={(value) =>
                        setTrustDetails((prev) => {
                          const updatedGrantors = [
                            ...prev.trustDetails.grantors,
                          ];
                          updatedGrantors[index].ssnOrItin = value;
                          return {
                            ...prev,
                            trustDetails: {
                              ...prev.trustDetails,
                              grantors: updatedGrantors,
                            },
                          };
                        })
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextInput
                      label="Street"
                      name="street"
                      value={grantor.address?.street || ""}
                      onChange={(e) =>
                        handleGrantorAddressChange(e, "street", index)
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextInput
                      label="Locality"
                      name="locality"
                      value={grantor.address?.locality || ""}
                      onChange={(e) =>
                        handleGrantorAddressChange(e, "locality", index)
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextInput
                      label="Region"
                      name="region"
                      value={grantor.address?.region || ""}
                      onChange={(e) =>
                        handleGrantorAddressChange(e, "region", index)
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextInput
                      label="Postal Code"
                      name="postalCode"
                      value={grantor.address?.postalCode || ""}
                      onChange={(e) =>
                        handleGrantorAddressChange(e, "postalCode", index)
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextInput
                      label="Country"
                      name="country"
                      value={grantor.address?.country || ""}
                      onChange={(e) =>
                        handleGrantorAddressChange(e, "country", index)
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Date of birth"
                      name="dateOfBirth"
                      value={
                        grantor.dateOfBirth
                          ? formatDateForInput(grantor.dateOfBirth)
                          : "" || ""
                      }
                      onChange={(e) =>
                        setTrustDetails((prev) => {
                          const updatedGrantors = [
                            ...prev.trustDetails.grantors,
                          ];
                          updatedGrantors[index].dateOfBirth = e.target.value;
                          return {
                            ...prev,
                            trustDetails: {
                              ...prev.trustDetails,
                              grantors: updatedGrantors,
                            },
                          };
                        })
                      }
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      variant="standard"
                      type="date"
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined" // or "outlined", "text" depending on style
                    color="primary" // Choose from "primary", "secondary", "error", etc.
                    size="small" // Choose "small", "medium", or "large"
                    onClick={() =>
                      setTrustDetails((prev) => {
                        const updatedGrantors = [...prev.trustDetails.grantors];
                        updatedGrantors.splice(index, 1); // Remove the grantor
                        return {
                          ...prev,
                          trustDetails: {
                            ...prev.trustDetails,
                            grantors: updatedGrantors,
                          },
                        };
                      })
                    }
                  >
                    Remove Grantor
                  </Button>
                </Box>
              </Fragment>
            ))}
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained" // You can use "contained", "outlined", or "text"
              color="primary" // Choose from "primary", "secondary", "success", etc.
              size="small" // Adjust to "small", "medium", or "large"
              onClick={() =>
                setTrustDetails((prev) => ({
                  ...prev,
                  trustDetails: {
                    ...prev.trustDetails,
                    grantors: [
                      ...(prev.trustDetails.grantors || []),
                      { firstName: "", lastName: "" }, // Add a new empty grantor object
                    ],
                  },
                }))
              }
            >
              Add New Grantor
            </Button>
          </Box>
        </Collapse>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControlLabel
            control={
              <Switch
                checked={trustDetails.trustDetails.deliveryAddressDifferent}
                onChange={(e) =>
                  setTrustDetails((prev) => ({
                    ...prev,
                    trustDetails: {
                      ...prev.trustDetails,
                      deliveryAddressDifferent: e.target.checked,
                    },
                  }))
                }
              />
            }
            label="Is address for delivery and notices different from above?"
          />
        </Grid>

        {trustDetails.trustDetails.deliveryAddressDifferent && (
          <Collapse in={trustDetails.trustDetails.deliveryAddressDifferent}>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="Street"
                  name="street"
                  value={trustDetails.trustDetails.deliveryAddress.street}
                  onChange={handleDeliveryAddressChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="Locality"
                  name="locality"
                  value={trustDetails.trustDetails.deliveryAddress.locality}
                  onChange={handleDeliveryAddressChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="Region"
                  name="region"
                  value={trustDetails.trustDetails.deliveryAddress.region}
                  onChange={handleDeliveryAddressChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="Postal Code"
                  name="postalCode"
                  value={trustDetails.trustDetails.deliveryAddress.postalCode}
                  onChange={handleDeliveryAddressChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  label="Country"
                  name="country"
                  value={trustDetails.trustDetails.deliveryAddress.country}
                  onChange={handleDeliveryAddressChange}
                />
              </Grid>
            </Grid>
          </Collapse>
        )}
      </Box>

      {/* Checkboxes */}
      <FormControlLabel
        control={
          <Checkbox
            checked={trustDetails.concentAndDiscloses}
            onChange={(event) =>
              handleCheckboxChange(event, "concentAndDiscloses")
            }
          />
        }
        label="I consent to and have read disclosures for electronic delivery of my Schedule K-1"
        sx={{ mt: 3 }}
      />

      {/* Save/Cancel Buttons */}
      <Box sx={{ mt: 3, display: "flex" }}>
        <div className="btn-save-next" style={{ marginRight: "10px" }}>
          <span
            className="btn btn-gradient btn-pill"
            onClick={() => handleSaveAndSubmit()}
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

export default TrustAccountForm;
