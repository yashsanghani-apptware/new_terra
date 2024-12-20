import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import TextInput from "@/utils/inputFields/TextInput";
import PhoneNumber from "@/utils/inputFields/PhoneNumber";
import EINInput from "@/utils/inputFields/EINInput";
import { createData, updateData } from "@/utils/postData";
import { BASE_URL } from "@/config/apiBaseUrls";
import { toast } from "react-toastify";
import { formatDateForInput } from "@/utils/format/FormatDate";

const EntityAccountForm = ({ setEditMode, userDetails, accounts }) => {
  const [entityDetails, setEntityDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    entityDetails: {
      entityName: "",
      entityType: "",
      signatoryTitle: "",
      ein: "",
      dateOfFormation: "",
      jurisdiction: "",
      deliveryAddressDifferent: false,
      deliveryAddress: {
        street: "",
        locality: "",
        region: "",
        postalCode: "",
        country: "",
      },
    },
    address: {
      street: "",
      locality: "",
      region: "",
      postalCode: "",
      country: "",
    },

    concentAndDiscloses: false,
  });
  const [differentAddressExpanded, setDifferentAddressExpanded] =
    useState(false);
  const [accountPresent, setAccountPresent] = useState(false);

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      accounts.forEach((account) => {
        if (account.accountType === "Entity") {
          // Update the form values with account details
          setEntityDetails((prevFormValues) => ({
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
    setEntityDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setEntityDetails((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };
  const handleDeliveryAddressChange = (field, value) => {
    setEntityDetails((prev) => ({
      ...prev,
      entityDetails: {
        ...prev.entityDetails,
        deliveryAddressDifferent: true,
        deliveryAddress: {
          ...prev.entityDetails.deliveryAddress,
          [field]: value,
        },
      }
    }));
  };
  const handleCheckboxChange = (event, field) => {
    setEntityDetails((prevValues) => ({
      ...prevValues,
      [field]: event.target.checked,
    }));
  };
  const handleEntityInputChange = (event) => {
      const { name, value } = event.target;
      setEntityDetails((prev) => ({
        ...prev,
        entityDetails: {
          ...prev.entityDetails,
          [name]: value,
        },
      }));
  }
  const handleSaveAndSubmit = async () => {
    const payload = {
      accountType: "Entity",
      details: entityDetails,
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
        toast.success("Entity Account created");
      } else {
        console.error("Failed to create account");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <>
      <Typography variant="h5">Entity Account</Typography>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Fill out the details for an entity account.
      </Typography>

      <Grid container spacing={2}>
        {/* Signatory Fields */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Signatory First Name"
            name="firstName"
            value={entityDetails.firstName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Signatory Last Name"
            name="lastName"
            value={entityDetails.lastName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Signatory Title"
            name="signatoryTitle"
            value={entityDetails.entityDetails.signatoryTitle}
            onChange={handleEntityInputChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Signatory Email"
            name="email"
            value={entityDetails.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Date of Formation"
            name="dateOfFormation"
            type="date"
            value={
              entityDetails.entityDetails.dateOfFormation
                ? formatDateForInput(entityDetails.entityDetails.dateOfFormation)
                : ""
            }
            onChange={handleEntityInputChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PhoneNumber
            label="Business Phone"
            name="phone"
            value={entityDetails.phone}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Entity Name"
            name="entityName"
            value={entityDetails.entityDetails.entityName}
            onChange={handleEntityInputChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Entity Type"
            name="entityType"
            value={entityDetails.entityDetails.entityType}
            onChange={handleEntityInputChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <EINInput
            label="Entity EIN"
            name="ein"
            value={entityDetails.entityDetails.ein}
            onChange={handleEntityInputChange}
          />
        </Grid>

        {/* Address Fields */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Street"
            name="street"
            value={entityDetails.address.street}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Locality"
            name="locality"
            value={entityDetails.address.locality}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Region"
            name="region"
            value={entityDetails.address.region}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Postal Code"
            name="postalCode"
            value={entityDetails.address.postalCode}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Country"
            name="country"
            value={entityDetails.address.country}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label="Entity Jurisdiction"
            name="jurisdiction"
            value={entityDetails.entityDetails.jurisdiction}
            onChange={handleEntityInputChange}
          />
        </Grid>
      </Grid>
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
                value={entityDetails.entityDetails.deliveryAddress.street}
                onChange={(event) =>
                  handleDeliveryAddressChange("street", event.target.value)
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                label="Locality"
                name="locality"
                value={entityDetails.entityDetails.deliveryAddress.locality}
                onChange={(event) =>
                  handleDeliveryAddressChange("locality", event.target.value)
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                label="Region"
                name="region"
                value={entityDetails.entityDetails.deliveryAddress.region}
                onChange={(event) =>
                  handleDeliveryAddressChange("region", event.target.value)
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                label="Postal Code"
                name="postalCode"
                value={entityDetails.entityDetails.deliveryAddress.postalCode}
                onChange={(event) =>
                  handleDeliveryAddressChange("postalCode", event.target.value)
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                label="Country"
                name="country"
                value={entityDetails.entityDetails.deliveryAddress.country}
                onChange={(event) =>
                  handleDeliveryAddressChange("country", event.target.value)
                }
              />
            </Grid>
          </Grid>
        </Collapse>
      </Box>
      <FormControlLabel
        control={
          <Checkbox
            checked={entityDetails.concentAndDiscloses}
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

export default EntityAccountForm;
