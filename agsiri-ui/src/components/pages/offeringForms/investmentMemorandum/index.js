import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const InvestMentMemorandum = ({
  handleSaveNext,
  detailsData,
  review,
  cropList,
}) => {
  const [formValues, setFormValues] = useState({
    row_crop: [],
    capital_being_raised: "",
    total_acres: "",
    price_unit: "",
    est_ownership_duration: "",
    investmentType: "",
    min_investment: "",
    offering_size: "",
    target_net_irr: "",
    target_net_cash_yield: "",
    target_net_moic: "",
    target_hold: "",
    target_net_ltv_ratio: "",
  });

  useEffect(() => {
    setFormValues(detailsData);
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  /**
   * Handle the change of selected row crops and update the state.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
   * @param {string[]} value - The selected row crops.
   */
  const handleRowCropChange = (event, value) => {
    setFormValues((prevValues) => ({ ...prevValues, row_crop: value }));
  };

  /**
   * Saves the current form values and navigates to the "Overview" tab.
   * Called when the user clicks the "Save and Next" button.
   */
  const handleSaveAndNext = () => {
    handleSaveNext("Overview", formValues, "details"); // Send data to parent
  };
  return (
    <div className="dashboard-content">
      <div
        className="editor-wrapper"
        style={review ? { maxWidth: "100%" } : {}}
      >
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <h5 style={{ marginTop: 0 }}>Investment Info</h5>

          <Grid container spacing={2}>
            <Grid item size={{ xs: 12, md: 6 }}>
              <Autocomplete
                disabled={review}
                multiple
                options={cropList}
                value={formValues?.row_crop?.length ? formValues?.row_crop : []}
                onChange={handleRowCropChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Crops"
                    variant="standard"
                    fullWidth
                  />
                )}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Capital Being Raised"
                variant="standard"
                fullWidth
                name="capital_being_raised"
                value={formValues.capital_being_raised}
                onChange={handleChange}
                disabled={review}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Total Acres"
                variant="standard"
                fullWidth
                name="total_acres"
                value={formValues.total_acres}
                onChange={handleChange}
                disabled={review}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Price/Unit"
                variant="standard"
                fullWidth
                name="price_unit"
                value={formValues.price_unit}
                onChange={handleChange}
                disabled={review}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Est. Ownership Duration (Years)"
                variant="standard"
                fullWidth
                name="est_ownership_duration"
                value={formValues.est_ownership_duration}
                onChange={handleChange}
                disabled={review}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Investment Type</InputLabel>
                <Select
                  name="investmentType"
                  value={formValues.investmentType}
                  onChange={handleChange}
                  disabled={review}
                  label="Investment Type"
                  variant="standard"
                >
                  <MenuItem value="Core">Core</MenuItem>
                  <MenuItem value="Value-add">Value-add</MenuItem>
                  <MenuItem value="Opportunistic">Opportunistic</MenuItem>
                </Select>
              </FormControl>{" "}
            </Grid>

            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Min. Investment"
                variant="standard"
                fullWidth
                name="min_investment"
                value={formValues.min_investment}
                onChange={handleChange}
                disabled={review}
              />
            </Grid>
          </Grid>

          <h5>KPIs</h5>

          <Grid container spacing={2}>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Offering Size"
                variant="standard"
                fullWidth
                name="offering_size"
                value={formValues.offering_size}
                onChange={handleChange}
                disabled={review}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Target Net IRR"
                variant="standard"
                fullWidth
                name="target_net_irr"
                value={formValues.target_net_irr}
                onChange={handleChange}
                disabled={review}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Target Net Cash Yield"
                variant="standard"
                fullWidth
                name="target_net_cash_yield"
                value={formValues.target_net_cash_yield}
                onChange={handleChange}
                disabled={review}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Target Net MOIC"
                variant="standard"
                fullWidth
                name="target_net_moic"
                value={formValues.target_net_moic}
                onChange={handleChange}
                disabled={review}
              />
            </Grid>

            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Target Hold"
                variant="standard"
                fullWidth
                name="target_hold"
                value={formValues.target_hold}
                onChange={handleChange}
                disabled={review}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Target Net LTV Ratio"
                variant="standard"
                fullWidth
                name="target_net_ltv_ratio"
                value={formValues.target_net_ltv_ratio}
                onChange={handleChange}
                disabled={review}
              />
            </Grid>
          </Grid>
        </Box>

        <div className="btn-save-next">
          {!review && (
            <span
              className="btn btn-gradient btn-pill"
              onClick={handleSaveAndNext}
            >
              Save & Next
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestMentMemorandum;
