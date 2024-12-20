import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IndividualAccountForm from "./individualAccount";
import SelfDirectedIRAForm from "./selfDirectedIRA";
import { getAPIData } from "@/utils/getData";
import { BASE_URL } from "@/config/apiBaseUrls";
import EntityAccountForm from "./entityAccount";
import TrustAccountForm from "./trustAccount";

const InvestorAccountsForm = ({ userDetails, countriesList, handleSubmit }) => {
  const [editMode, setEditMode] = useState(false);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (userDetails) {
      fetchAllAccounts();
    }
  }, [userDetails]);

  const fetchAllAccounts = async () => {
    try {
      const response = await getAPIData(
        `${BASE_URL.POLICY}/users/${userDetails._id}/accounts`
      );
      setAccounts(response);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };
  const handleEditClick = (type) => {
    setEditMode(type);
  };
  return (
    <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
      {editMode === "Individual Account" ? (
        <IndividualAccountForm
          userDetails={userDetails}
          setEditMode={setEditMode}
          accounts={accounts}
        />
      ) 
      // : editMode === "Self-Directed IRA" ? (
      //   <SelfDirectedIRAForm
      //     custodians={["Custodian A", "Custodian B", "Custodian C"]}
      //     handleSave={() => console.log("Form saved")}
      //     setEditMode={setEditMode}
      //     userDetails={userDetails}
      //     accounts={accounts}
      //   />
      // ) 
      : editMode === "Entity Account" ? (
        <EntityAccountForm
          setEditMode={setEditMode}
          userDetails={userDetails}
          accounts={accounts}
        />
      ) : editMode === "Trust" ? (
        <TrustAccountForm
          setEditMode={setEditMode}
          userDetails={userDetails}
          accounts={accounts}
        />
      ) : (
        <>
          <Box
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 2,
              boxShadow: 3, // Adds a subtle shadow
              backgroundColor: "#ffffff", // White background for contrast
              cursor: "pointer",
            }}
            onClick={() => handleEditClick("Individual Account")}
          >
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid>
                <Typography variant="h6">Individual Account</Typography>
                <Typography variant="subtitle1">
                  An individual or joint tenant account
                </Typography>
              </Grid>
              <Grid>
                <ArrowForwardIosIcon />
              </Grid>
            </Grid>
          </Box>
          {/* <Box
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "#ffffff",
              cursor: "pointer",
            }}
            onClick={() => handleEditClick("Self-Directed IRA")}
          >
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid>
                <Typography variant="h6">Self-Directed IRA</Typography>
                <Typography variant="subtitle1">
                  The custodian will control the flow
                </Typography>
              </Grid>
              <Grid>
                <ArrowForwardIosIcon />
              </Grid>
            </Grid>
          </Box> */}
          <Box
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "#ffffff",
              cursor: "pointer",
            }}
            onClick={() => handleEditClick("Entity Account")}
          >
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid>
                <Typography variant="h6">Entity Account</Typography>
                <Typography variant="subtitle1">
                  LIC, Partnership, or Corposration
                </Typography>
              </Grid>
              <Grid>
                <ArrowForwardIosIcon />
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "#ffffff",
              cursor: "pointer",
            }}
            onClick={() => handleEditClick("Trust")}
          >
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid>
                <Typography variant="h6">Trust</Typography>
                <Typography variant="subtitle1">
                  Revocable or irrevocable trust
                </Typography>
              </Grid>
              <Grid>
                <ArrowForwardIosIcon />
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

export default InvestorAccountsForm;
