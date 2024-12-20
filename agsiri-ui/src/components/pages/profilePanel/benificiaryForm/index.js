import React, { useEffect, useState } from "react";
import { Box, Typography, InputLabel, Select, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RenderBeneficiaryForm from "./RenderBeneficiaryForm";
import { createData, updateData } from "@/utils/postData";
import { BASE_URL } from "@/config/apiBaseUrls";
import { toast } from "react-toastify";
import { getAPIData } from "@/utils/getData";
import { useTranslation } from "react-i18next";

const BeneficiaryForm = ({ userDetails }) => {
  const { t } = useTranslation("common");

  const [beneficiaryType, setBeneficiaryType] = useState(false);
  const [primaryBeneficiaryRole, setPrimaryBeneficiaryRole] = useState("");
  const [contingentBeneficiaryRole, setContingentBeneficiaryRole] = useState("");
  const [primaryBeneficiary, setPrimaryBeneficiary] = useState({
    type: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: {
      street: "",
      locality: "",
      region: "",
      postalCode: "",
      country: "",
    },
    socialSecurityNumber: "xxx-xx-xxxx",
    acceptTermsAndConditions: false,
    relationship: "",
    isContingent: false,
    isNonUSPerson: false,
    nonUSPersonDetails: {
      countryOfCitizenship: "",
      countryOfResidency: "",
    },
    isTrust: false,
    trustDetails: {
      trustType: "",
      trustName: "",
      ssnOrItin: "",
      dateOfFormation: "",
      isEIN: false,
      trustEIN: "",
    },
    //For Entity
    isEntity: false,
    entityDetails: {
      signatoryTitle: "",
      entityName: "",
      entityType: "",
      entityEIN: "",
      entityJurisdiction: "",
    },
  });
  const [contingentBeneficiary, setContingentBeneficiary] = useState({
    type: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: {
      street: "",
      locality: "",
      region: "",
      postalCode: "",
      country: "",
    },
    socialSecurityNumber: "xxx-xx-xxxx",
    acceptTermsAndConditions: false,
    relationship: "",
    isContingent: true,
    isNonUSPerson: false,
    nonUSPersonDetails: {
      countryOfCitizenship: "",
      countryOfResidency: "",
    },
    isTrust: false,
    trustDetails: {
      trustType: "",
      trustName: "",
      ssnOrItin: "",
      dateOfFormation: "",
      isEIN: false,
      trustEIN: "",
    },
    //For Entity
    isEntity: false,
    entityDetails: {
      signatoryTitle: "",
      entityName: "",
      entityType: "",
      entityEIN: "",
      entityJurisdiction: "",
    },
  });
  const [primaryBeneficiaryId, setPrimaryBeneficiaryId] = useState();
  const [contingentBeneficiaryId, setContingentBeneficiaryId] = useState();
  const handleEditClick = (type) => {
    setBeneficiaryType(type);
  };

  const handleBeneficiaryRoleChange = (event) => {
    const selectedRole = event.target.value;
    if (beneficiaryType === "Contingent") {
      setContingentBeneficiaryRole(selectedRole);
      setContingentBeneficiary({
        type: selectedRole,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: {
          street: "",
          locality: "",
          region: "",
          postalCode: "",
          country: "",
        },
        socialSecurityNumber: "",
        acceptTermsAndConditions: false,
        relationship: "",
        isContingent: true,
        isNonUSPerson: selectedRole === "non-us-person" ? true : false,
        nonUSPersonDetails: {
          countryOfCitizenship: "",
          countryOfResidency: "",
        },
        isTrust: selectedRole === "trust" ? true : false,
        trustDetails: {
          trustType: "",
          trustName: "",
          ssnOrItin: "",
          dateOfFormation: "",
          isEIN: false,
          trustEIN: "",
        },
        //For Entity
        isEntity: selectedRole === "entities" ? true : false,
        entityDetails: {
          signatoryTitle: "",
          entityName: "",
          entityType: "",
          entityEIN: "",
          entityJurisdiction: "",
        },
      });
    } else {
      setPrimaryBeneficiaryRole(selectedRole)
      setPrimaryBeneficiary({
        type: selectedRole,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        address: {
          street: "",
          locality: "",
          region: "",
          postalCode: "",
          country: "",
        },
        socialSecurityNumber: "",
        acceptTermsAndConditions: false,
        relationship: "",
        isContingent: beneficiaryType === "Contingent" ? true : false,
        isNonUSPerson: selectedRole === "non-us-person" ? true : false,
        nonUSPersonDetails: {
          countryOfCitizenship: "",
          countryOfResidency: "",
        },
        isTrust: selectedRole === "trust" ? true : false,
        trustDetails: {
          trustType: "",
          trustName: "",
          ssnOrItin: "",
          dateOfFormation: "",
          isEIN: false,
          trustEIN: "",
        },
        //For Entity
        isEntity: selectedRole === "entities" ? true : false,
        entityDetails: {
          signatoryTitle: "",
          entityName: "",
          entityType: "",
          entityEIN: "",
          entityJurisdiction: "",
        },
      });
    }
  };

  useEffect(() => {
    getBeneficiaries();
  }, [userDetails]);
  const getBeneficiaries = async () => {
    try {
      if (userDetails && userDetails._id) {
        const response = await getAPIData(
          `${BASE_URL.POLICY}/users/${userDetails._id}/beneficiaries`
        );
        response.map((item) => {
          if (item.isContingent) {
            setContingentBeneficiary(item);
            setContingentBeneficiaryRole(item.type);
            setContingentBeneficiaryId(item._id);
          } else {
            setPrimaryBeneficiary(item);
            setPrimaryBeneficiaryRole(item.type);
            setPrimaryBeneficiaryId(item._id);
          }
        });
      }
    } catch (error) {
      console.error("Error fetching beneficiaries:", error);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (beneficiaryType === "Contingent") {
      setContingentBeneficiary((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    } else {
      setPrimaryBeneficiary((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };
  const handleSSNChange = (value) => {
    if (beneficiaryType === "Contingent") {
      setContingentBeneficiary((prevValues) => ({
        ...prevValues,
        socialSecurityNumber: value,
      }));
    } else {
      setPrimaryBeneficiary((prevValues) => ({
        ...prevValues,
        socialSecurityNumber: value,
      }));
    }
  };
  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    if (beneficiaryType === "Contingent") {
      setContingentBeneficiary((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [name]: value, // Update the specific field in the address object
        },
      }));
    } else {
      setPrimaryBeneficiary((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [name]: value, // Update the specific field in the address object
        },
      }));
    }
  };
  const handleCheckboxChange = (event) => {
    if (beneficiaryType === "Contingent") {
      setContingentBeneficiary((prevValues) => ({
        ...prevValues,
        acceptTermsAndConditions: event.target.checked,
      }));
    } else {
      setPrimaryBeneficiary((prevValues) => ({
        ...prevValues,
        acceptTermsAndConditions: event.target.checked,
      }));
    }
  };
  const handleEINCheckboxChange = (event) => {
    if (beneficiaryType === "Contingent") {
      setContingentBeneficiary((prevState) => ({
        ...prevState,
        trustDetails: {
          ...prevState.trustDetails,
          isEIN: event.target.checked, // Update the specific field in the address object
        },
      }));
    } else {
      setPrimaryBeneficiary((prevState) => ({
        ...prevState,
        trustDetails: {
          ...prevState.trustDetails,
          isEIN: event.target.checked, // Update the specific field in the address object
        },
      }));
    }
  };
  const handleNonUsChange = (event) => {
    const { name, value } = event.target;
    if (beneficiaryType === "Contingent") {
      setContingentBeneficiary((prevState) => ({
        ...prevState,
        nonUSPersonDetails: {
          ...prevState.nonUSPersonDetails,
          [name]: value, // Update the specific field in the address object
        },
      }));
    } else {
      setPrimaryBeneficiary((prevState) => ({
        ...prevState,
        nonUSPersonDetails: {
          ...prevState.nonUSPersonDetails,
          [name]: value, // Update the specific field in the address object
        },
      }));
    }
  };

  const handleEntityChange = (event) => {
    const { name, value } = event.target;
    if (beneficiaryType === "Contingent") {
      setContingentBeneficiary((prevState) => ({
        ...prevState,
        entityDetails: {
          ...prevState.entityDetails,
          [name]: value, // Update the specific field in the address object
        },
      }));
    } else {
      setPrimaryBeneficiary((prevState) => ({
        ...prevState,
        entityDetails: {
          ...prevState.entityDetails,
          [name]: value, // Update the specific field in the address object
        },
      }));
    }
  };
  const handleTrustChange = (event) => {
    const { name, value } = event.target;
    if (beneficiaryType === "Contingent") {
      setContingentBeneficiary((prevState) => ({
        ...prevState,
        trustDetails: {
          ...prevState.trustDetails,
          [name]: value, // Update the specific field in the address object
        },
      }));
    } else {
      setPrimaryBeneficiary((prevState) => ({
        ...prevState,
        trustDetails: {
          ...prevState.trustDetails,
          [name]: value, // Update the specific field in the address object
        },
      }));
    }
  };
  const handleBeneficiarySave = async () => {
    let payload = {};
    let beneficiaryId = "";
    if (beneficiaryType === "Primary") {
      payload = primaryBeneficiary;
      beneficiaryId = primaryBeneficiaryId;
    } else {
      payload = contingentBeneficiary;
      beneficiaryId = contingentBeneficiaryId;
    }
    if (primaryBeneficiaryId && beneficiaryType === "Primary") {
      const res = await updateData(
        payload,
        `${BASE_URL.POLICY}/users/${userDetails._id}/beneficiaries/${beneficiaryId}`
      );
      if (res) {
        toast.success(t("BENEFICIARY_UPDATED_SUCCESS", { beneficiaryType }));
      }
    } else if (contingentBeneficiaryId) {
      const res = await updateData(
        payload,
        `${BASE_URL.POLICY}/users/${userDetails._id}/beneficiaries/${beneficiaryId}`
      );

      if (res) {
        toast.success(t("BENEFICIARY_UPDATED_SUCCESS", { beneficiaryType }));
      }
    } else {
      const res = await createData(
        payload,
        `${BASE_URL.POLICY}/users/${userDetails._id}/beneficiaries`
      );
      if (res) {
        toast.success(t("BENEFICIARY_CREATED_SUCCESS", { beneficiaryType }));
      }
    }
  };

  return (
    <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
      {!beneficiaryType ? (
        <>
          {/* Primary Row */}
          <Box
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 2,
              boxShadow: 3, // Adds a subtle shadow
              backgroundColor: "#ffffff", // White background for contrast
              cursor: "pointer",
            }}
            onClick={() => handleEditClick("Primary")}
          >
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid>
                <Typography variant="h6">{t("PRIMARY")}</Typography>
                <Typography variant="subtitle1">{`${
                  primaryBeneficiary?.firstName || ""
                } ${primaryBeneficiary?.lastName || ""}`}</Typography>
              </Grid>
              <Grid>
                <ArrowForwardIosIcon />
              </Grid>
            </Grid>
          </Box>

          {/* Contingent Row */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              boxShadow: 3, // Adds the shadow for differentiation
              backgroundColor: "#ffffff",
              cursor: "pointer",
            }}
            onClick={() => handleEditClick("Contingent")}
          >
            <Grid container alignItems="center" justifyContent="space-between">
              {/* Title */}
              <Grid>
                <Typography variant="h6">{t("CONTINGENT")}</Typography>
                <Typography variant="subtitle1">{`${
                  contingentBeneficiary?.firstName || ""
                } ${contingentBeneficiary?.lastName || "Add"}`}</Typography>
              </Grid>

              {/* Forward Arrow */}
              <Grid>
                <ArrowForwardIosIcon />
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {beneficiaryType === "Primary"
              ? t("PRIMARY_BENEFICIARY_TYPE")
              : t("CONTINGENT_BENEFICIARY_TYPE")}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            {beneficiaryType === "Primary"
              ? t("PRIMARY_BENEFICIARY_DESCRIPTION")
              : t("CONTINGENT_BENEFICIARY_DESCRIPTION")
              }
          </Typography>
          <InputLabel>{t("BENEFICIARY_TYPE")}</InputLabel>
          <Select
            value={beneficiaryType === "Primary" ? primaryBeneficiaryRole : contingentBeneficiaryRole}
            onChange={handleBeneficiaryRoleChange}
            variant="standard"
            fullWidth
            sx={{ mb: 3 }}
          >
            {/*  'us-person' | 'non-us-person' | 'trust' | 'entities' */}
            <MenuItem value="us-person">US Person</MenuItem>
            <MenuItem value="non-us-person">Non-US Person</MenuItem>
            <MenuItem value="entities">Entity</MenuItem>
            <MenuItem value="trust">Trust</MenuItem>
          </Select>
          <RenderBeneficiaryForm
            beneficiaryRole={beneficiaryType === "Primary" ? primaryBeneficiaryRole : contingentBeneficiaryRole}
            beneficiaryData={
              beneficiaryType === "Primary"
                ? primaryBeneficiary
                : contingentBeneficiary
            }
            handleInputChange={handleInputChange}
            handleAddressChange={handleAddressChange}
            handleNonUsChange={handleNonUsChange}
            handleEntityChange={handleEntityChange}
            handleTrustChange={handleTrustChange}
            handleSSNChange={handleSSNChange}
            handleCheckboxChange={handleCheckboxChange}
            handleEINCheckboxChange={handleEINCheckboxChange}
          />
          <Box sx={{ mt: 3, display: "flex" }}>
            <div className="btn-save-next" style={{ marginRight: "10px" }}>
              <span
                className="btn btn-gradient btn-pill"
                onClick={handleBeneficiarySave}
              >
                {t("SAVE")}
              </span>
            </div>
            <div className="btn-save-next">
              <span
                className="btn back-btn-gradient btn-pill"
                onClick={() => setBeneficiaryType(null)}
              >
                {t("BACK")}
              </span>
            </div>
          </Box>
        </>
      )}
    </Box>
  );
};

export default BeneficiaryForm;
