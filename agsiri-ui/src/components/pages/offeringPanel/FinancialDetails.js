import React from "react";
import {
  Box,
  Typography,
  Paper,
  // Grid,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import NumberFormatter from "@/utils/NumberFormatter";
import CurrencyFormatter from "@/utils/currencyFormatter";

const fieldFormatConfig = {
  cost_of_farmland: 'currency',
  land_due_diligence_fee: 'currency',
  title_transfer_closing_costs: 'currency',
  broker_dealer_filing_fees: 'currency',
  legal_preparation_cost: 'currency',
  working_capital_reserve: 'currency',
  total_estimated_cost_of_farm: 'currency',
  total_cost_per_acre: 'currency',
  total_acres: 'number',
  estimated_rent_per_acre: 'currency',
  number_of_tillable_acres: 'number',
  other_income: 'currency',
  estimated_total_revenue: 'currency',
  farm_offering_price: 'currency',
  farm_management_fee_percentage: 'percentage',
  annual_management_fee: 'currency',
  estimated_annual_taxes: 'currency',
  estimated_annual_insurance: 'currency',
  tax_preparation_residency_fee: 'currency',
  total_estimated_annual_expenses: 'currency',
  total_estimated_annual_net_income: 'currency'
};


const formatValue = (key, value) => {
  switch (fieldFormatConfig[key]) {
    case 'currency':
      return <CurrencyFormatter value={value} />;
    case 'percentage':
      return `${value}%`;
    case 'number':
    default:
      return <NumberFormatter value={value} />;
  }
};

const FinincialDetails = ({ detailsData, review }) => {
  return (
    <div className="dashboard-content">
      <div className="editor-wrapper" style={review ? { maxWidth: "100%" } : {}}>
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          {detailsData?.isViewMode ? (
            detailsData?.financial_details ? (
              <>
                {/* Operating Expense Net Income Estimates */}
                {detailsData?.financial_details?.operating_expense_net_income_estimates && (
                  <div>
                    <h4 className="content-title mb-4 mt-0 pb-4 pt-0" style={{ borderBottom: "1px solid #2222", borderTop: "0px solid #2222" }}>  <strong>Operating Expense Net Income Estimates</strong> </h4>

                    <Grid container spacing={2}>
                      {Object.entries(detailsData.financial_details.operating_expense_net_income_estimates).map(
                        ([key, value]) => (
                          <Grid size={{ xs: 12, md: 12 }} key={key}>
                            <Paper elevation={0} sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
                              <Typography variant="subtitle1"><>{formatLabel(key)}</></Typography>
                              <Typography variant="body1"> {formatValue(key, value)} </Typography>
                            </Paper>
                          </Grid>
                        )
                      )}
                    </Grid>
                  </div>
                )}

                {/* Rent Estimates */}
                {detailsData?.financial_details?.rent_estimates && (
                  <div>
                    <h4 className="content-title mb-4 mt-4 pb-4 pt-4" style={{ borderBottom: "1px solid #2222", borderTop: "1px solid #2222" }}> <strong>Rent Estimates</strong></h4>

                    <Grid container spacing={2}>
                      {Object.entries(detailsData.financial_details.rent_estimates).map(
                        ([key, value]) => (
                          <Grid size={{ xs: 12, md: 12 }} key={key}>
                            <Paper elevation={0} sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
                              <Typography variant="subtitle1"><>{formatLabel(key)}</></Typography>
                              <Typography variant="body1">{formatValue(key, value)}</Typography>
                            </Paper>
                          </Grid>
                        )
                      )}
                    </Grid>
                  </div>
                )}

                {/* Total Cost of Farm */}
                {detailsData?.financial_details?.total_cost_of_farm && (
                  <div>
                    <h4 className="content-title mb-4 mt-4 pb-4 pt-4" style={{ borderBottom: "1px solid #2222", borderTop: "1px solid #2222" }}> <strong> Total Cost of Farm</strong></h4>

                    <Grid container spacing={2}>
                      {Object.entries(detailsData.financial_details.total_cost_of_farm).map(
                        ([key, value]) => (
                          <Grid size={{ xs: 12, md: 12 }} key={key}>
                            <Paper elevation={0} sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
                              <Typography variant="subtitle1"><>{formatLabel(key)}</></Typography>
                              <Typography variant="body1">{formatValue(key, value)}</Typography>
                            </Paper>
                          </Grid>
                        )
                      )}
                    </Grid>
                  </div>
                )}
              </>
            ) : (
              <Typography variant="body1" color="textSecondary">
                No Financial Details Found
              </Typography>
            )
          ) : null}
        </Box>
      </div>
    </div>
  );
};

// Helper function to format keys to more readable labels
const formatLabel = (label) =>
  label.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

export default FinincialDetails;

