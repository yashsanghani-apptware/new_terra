import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const SelfDirectedIRAForm = ({ custodians, handleSave, setEditMode, userDetails, accounts }) => {
  const [formValues, setFormValues] = useState({
    custodian: "",
    fundSource: "",
  });
  const [accountPresent, setAccountPresent] = useState(false);
  useEffect(() => {
    if (accounts && accounts.length > 0) {
      accounts.forEach((account) => {
        if (account.accountType === "Self-Directed IRA") {
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      accountType: "Self-Directed IRA",
      details: {
        ...formValues,
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
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#ffffff",
        mt: 2,
      }}
    >
      {/* Title and Subtitle */}
      <Typography variant="h5">Self-Directed IRA</Typography>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        The custodian will control the flow of the funds
      </Typography>

      {/* Form Fields */}
      <Grid container spacing={2}>
        {/* Custodian Dropdown */}
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel id="custodian-label">Custodian</InputLabel>
            <Select
              labelId="custodian-label"
              name="custodian"
              value={formValues.custodian}
              onChange={handleChange}
              variant="standard"
            >
              {custodians.map((custodian, index) => (
                <MenuItem key={index} value={custodian}>
                  {custodian}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Fund Source Field */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Where are the funds coming from?"
            placeholder="Where are the funds coming from?"
            name="fundSource"
            value={formValues.fundSource}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>

      {/* Note Section */}
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ mt: 3, fontStyle: "italic" }}
      >
        Don’t see your custodian listed? We’re happy to look into integration
        options; please contact us at{" "}
        <a
          href="mailto:info@farmtogether.com"
          style={{ textDecoration: "none", color: "blue" }}
        >
          info@farmtogether.com
        </a>{" "}
        with the name of your custodian to request support.
      </Typography>
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
    </Box>
  );
};

export default SelfDirectedIRAForm;
