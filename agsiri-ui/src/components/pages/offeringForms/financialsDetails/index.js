import React, { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";

const FinincialsDetails = ({ handleSaveNext, financialDetails, review }) => {
  const [formValues1, setFormValues1] = useState({
    total_cost_of_farm: {},
    rent_estimates: {},
    operating_expense_net_income_estimates: {}
  });

  useEffect(() => {
    if (financialDetails) {
      setFormValues1(financialDetails);
    }
  }, [financialDetails]);
  
  /**
   * Handles changes to the financial details form fields
   * @param {event} event - The event object
   * @param {string} key - The key of the form field in the state object
   */
  const handleChange = (event, key) => {
    const { name, value } = event.target;
    setFormValues1((prevValues) => ({
      ...prevValues,
      [key]: {
        ...prevValues[key],
        [name]: value,
      },
    }));
  };

  const handleSaveAndNext = () => {
    handleSaveNext("Documents", formValues1, "financial_details");
  };

  return (
    <div className="dashboard-content">
      <div className="editor-wrapper" style={review ? {maxWidth: "100%"}: {}}>
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <h5 style={{ marginTop: 0 }}>Total Cost of Farm</h5>
          <Grid container spacing={2}>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Farmland Cost"
                variant="standard"
                disabled={review}
                type="number"
                fullWidth
                name="cost_of_farmland"
                value={formValues1?.total_cost_of_farm?.cost_of_farmland}
                onChange={(e) => handleChange(e, "total_cost_of_farm")}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Land Due Diligence Fee"
                variant="standard"
                disabled={review}
                type="number"
                fullWidth
                name="land_due_diligence_fee"
                value={formValues1?.total_cost_of_farm?.land_due_diligence_fee}
                onChange={(e) => handleChange(e, "total_cost_of_farm")}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Title, Transfer & Closing Costs"
                variant="standard"
                disabled={review}
                type="number"
                fullWidth
                name="title_transfer_closing_costs"
                value={formValues1?.total_cost_of_farm?.title_transfer_closing_costs}
                onChange={(e) => handleChange(e, "total_cost_of_farm")}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="3rd Party Broker-Dealer & Filing Fees"
                variant="standard"
                disabled={review}
                type="number"
                fullWidth
                name="broker_dealer_filing_fees"
                value={formValues1?.total_cost_of_farm?.broker_dealer_filing_fees}
                onChange={(e) => handleChange(e, "total_cost_of_farm")}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Legal Preparation Cost"
                variant="standard"
                disabled={review}
                type="number"
                fullWidth
                name="legal_preparation_cost"
                value={formValues1?.total_cost_of_farm?.legal_preparation_cost}
                onChange={(e) => handleChange(e, "total_cost_of_farm")}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Working Capital Reserve"
                variant="standard"
                disabled={review}
                type="number"
                fullWidth
                name="working_capital_reserve"
                value={formValues1?.total_cost_of_farm?.working_capital_reserve}
                onChange={(e) => handleChange(e, "total_cost_of_farm")}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Total Estimated Cost of Farm"
                variant="standard"
                disabled={review}
                type="number"
                fullWidth
                name="total_estimated_cost_of_farm"
                value={formValues1?.total_cost_of_farm?.total_estimated_cost_of_farm}
                onChange={(e) => handleChange(e, "total_cost_of_farm")}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Total Acres"
                variant="standard"
                disabled={review}
                type="number"
                fullWidth
                name="total_acres"
                value={formValues1?.total_cost_of_farm?.total_acres}
                onChange={(e) => handleChange(e, "total_cost_of_farm")}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Total Cost Per Acre"
                variant="standard"
                disabled={review}
                type="number"
                fullWidth
                name="total_cost_per_acre"
                value={formValues1?.total_cost_of_farm?.total_cost_per_acre}
                onChange={(e) => handleChange(e, "total_cost_of_farm")}
              />
            </Grid>
          </Grid>

          {/* Rent Estimates Section */}
          <h5>Rent Estimates</h5>
          <Grid container spacing={2}>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Estimated Rent per Acre"
                variant="standard"
                disabled={review}
                type="number"
                fullWidth
                name="estimated_rent_per_acre"
                value={formValues1?.rent_estimates?.estimated_rent_per_acre}
                onChange={(e) => handleChange(e, "rent_estimates")}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Number of Tillable Acres"
                variant="standard"
                disabled={review}
                type="number"
                fullWidth
                name="number_of_tillable_acres"
                value={formValues1?.rent_estimates?.number_of_tillable_acres}
                onChange={(e) => handleChange(e, "rent_estimates")}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Other Income (if any)"
                variant="standard"
                disabled={review}
                type="number"
                fullWidth
                name="other_income"
                value={formValues1?.rent_estimates?.other_income}
                onChange={(e) => handleChange(e, "rent_estimates")}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Estimated Total Revenue"
                variant="standard"
                disabled={review}
                type="number"
                fullWidth
                name="estimated_total_revenue"
                value={formValues1?.rent_estimates?.estimated_total_revenue}
                onChange={(e) => handleChange(e, "rent_estimates")}
              />
            </Grid>
          </Grid>

          {/* Operating Expense & Net Income Estimates Section */}
          <h5>Operating Expense & Net Income Estimates</h5>
          <Grid container spacing={2}>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Farm Offering Price"
                variant="standard"
                disabled={review}
                type="number"
                fullWidth
                name="farm_offering_price"
                value={formValues1?.operating_expense_net_income_estimates?.farm_offering_price}
                onChange={(e) => handleChange(e, "operating_expense_net_income_estimates")}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Farm Management Fee (% of Offering Price)"
                variant="standard"
                disabled={review}
                type="number"
                fullWidth
                name="farm_management_fee_percentage"
                value={formValues1?.operating_expense_net_income_estimates?.farm_management_fee_percentage}
                onChange={(e) => handleChange(e, "operating_expense_net_income_estimates")}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Annual Management Fee"
                variant="standard"
                disabled={review}
                type="number"
                fullWidth
                name="annual_management_fee"
                value={formValues1?.operating_expense_net_income_estimates?.annual_management_fee}
                onChange={(e) => handleChange(e, "operating_expense_net_income_estimates")}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Estimated Annual Taxes"
                variant="standard"
                disabled={review}
                type="number"
                fullWidth
                name="estimated_annual_taxes"
                value={formValues1?.operating_expense_net_income_estimates?.estimated_annual_taxes}
                onChange={(e) => handleChange(e, "operating_expense_net_income_estimates")}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Estimated Annual Insurance"
                variant="standard"
                disabled={review}
                type="number"
                fullWidth
                name="estimated_annual_insurance"
                value={formValues1?.operating_expense_net_income_estimates?.estimated_annual_insurance}
                onChange={(e) => handleChange(e, "operating_expense_net_income_estimates")}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Tax Preparation & Residency Fee"
                variant="standard"
                disabled={review}
                type="number"
                fullWidth
                name="tax_preparation_residency_fee"
                value={formValues1?.operating_expense_net_income_estimates?.tax_preparation_residency_fee}
                onChange={(e) => handleChange(e, "operating_expense_net_income_estimates")}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Total Estimated Annual Expenses"
                variant="standard"
                disabled={review}
                type="number"
                fullWidth
                name="total_estimated_annual_expenses"
                value={formValues1?.operating_expense_net_income_estimates?.total_estimated_annual_expenses}
                onChange={(e) => handleChange(e, "operating_expense_net_income_estimates")}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Total Estimated Annual Net Income"
                variant="standard"
                disabled={review}
                type="number"
                fullWidth
                name="total_estimated_annual_net_income"
                value={formValues1?.operating_expense_net_income_estimates?.total_estimated_annual_net_income}
                onChange={(e) => handleChange(e, "operating_expense_net_income_estimates")}
              />
            </Grid>
          </Grid>
        </Box>
        <div className="btn-save-next">
          {
            !review &&
            <span
            className="btn btn-gradient btn-pill"
            onClick={handleSaveAndNext}
          >
            Save & Next
          </span>
          }
          
        </div>
      </div>
    </div>
  );
};

export default FinincialsDetails;
