import React from "react";
import {
  Box,
  Typography,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import NumberFormatter from "@/utils/NumberFormatter";
import CurrencyFormatter from "@/utils/currencyFormatter";

const InvestMentDetails = ({ handleSaveNext, detailsData, review }) => {
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
          <h4 className="content-title mb-4 pb-4 pt-0" style={{ borderBottom: "1px solid #2222", borderTop: "0px solid #2222" }}> <strong> Investment Info </strong></h4>

          {detailsData?.isViewMode ? (
            detailsData?.details ? (
              <Grid container spacing={2}>
                {detailsData?.details?.row_crop && detailsData?.details?.row_crop.length > 0 && (
                  <Grid size={{ xs: 12, md: 12 }}>
                    <Paper elevation={0} sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1"><>Crops</></Typography>
                      <Typography variant="body1">{detailsData?.details?.row_crop?.join(", ")}</Typography>
                    </Paper>
                  </Grid>
                )}
                {detailsData?.details?.capital_being_raised && (
                  <Grid size={{ xs: 12, md: 12 }}>
                    <Paper elevation={0} sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1"><>Capital Being Raised</></Typography>
                      <Typography variant="body1"><CurrencyFormatter value={detailsData?.details?.capital_being_raised} /> </Typography>
                    </Paper>
                  </Grid>
                )}
                {detailsData?.details?.total_acres && (
                  <Grid size={{ xs: 12, md: 12 }}>
                    <Paper elevation={0} sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1"><>Total Acres</></Typography>
                      <Typography variant="body1"><NumberFormatter value={detailsData?.details?.total_acres} /> </Typography>
                    </Paper>
                  </Grid>
                )}
                {detailsData?.details?.price_unit && (
                  <Grid size={{ xs: 12, md: 12 }}>
                    <Paper elevation={0} sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1"><>Price/Unit</></Typography>
                      <Typography variant="body1"><CurrencyFormatter value={detailsData?.details?.price_unit} /> </Typography>
                    </Paper>
                  </Grid>
                )}
                {detailsData?.details?.est_ownership_duration && (
                  <Grid size={{ xs: 12, md: 12 }}>
                    <Paper elevation={0} sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1"><>Est. Ownership Duration)</></Typography>
                      <Typography variant="body1">{detailsData?.details?.est_ownership_duration} Years</Typography>
                    </Paper>
                  </Grid>
                )}
                {detailsData?.details?.investmentType && (
                  <Grid size={{ xs: 12, md: 12 }}>
                    <Paper elevation={0} sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1"><>Investment Type</></Typography>
                      <Typography variant="body1">{detailsData?.details?.investmentType}</Typography>
                    </Paper>
                  </Grid>
                )}
                {detailsData?.details?.min_investment && (
                  <Grid size={{ xs: 12, md: 12 }}>
                    <Paper elevation={0} sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1"><>Min. Investment</></Typography>
                      <Typography variant="body1"><CurrencyFormatter value={detailsData?.details?.min_investment} /></Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            ) : (
              <Typography variant="body1" color="textSecondary">
                No Investment Info Found
              </Typography>
            )
          ) : null}
        </Box>
      </div>
    </div>
  );
};

export default InvestMentDetails;