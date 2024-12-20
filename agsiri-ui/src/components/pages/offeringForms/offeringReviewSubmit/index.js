import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { cropOptions } from "@/constValues/constValues";
import InvestMentMemorandum from "../investmentMemorandum";
import OfferingOverview from "../offeringOverview";
import PropertyDetails from "../propertyDetails";
import FinincialsDetails from "../financialsDetails";
import OfferingDocuments from "../offeringDocuments";

const OfferingReviewSubmit = ({
  offeringDetails,
  offeringFormValues,
  singleListingData,
  handleSubmit,
  setOverviewFlag,
  offeringSubmitted,
}) => {
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    setFlag(true);
  }, []);
  return (
    <div className="dashboard-content">
      <div className="editor-wrapper">
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <h5 style={{ marginTop: 0 }}>Review and Submit</h5>

          <PropertyDetails
            singleListingData={singleListingData}
            //   handleSaveNext={setActiveTab}
            fromOfferScreen={true}
            review={true}
          />
          {flag && (
            <OfferingOverview
              offeringDetails={offeringDetails}
              //   handleSaveNext={handleSaveNext}
              overviewData={offeringFormValues.investment_overview}
              review={true}
              id="reviewOverview123"
            />
          )}
          <InvestMentMemorandum
            // handleSaveNext={handleSaveNext}
            detailsData={offeringFormValues.details}
            review={true}
          />

          
          <FinincialsDetails
            financialDetails={offeringFormValues.financial_details}
            review={true}
          />
          <OfferingDocuments
            offeringDetails={offeringDetails}
            documentsDetails={offeringFormValues.documents}
            review={true}
            setOverviewFlag={setOverviewFlag}
          />
        </Box>
        <div className="btn-save-next">
          {offeringSubmitted ? (
            <span className="btn btn-gradient btn-pill">Offer Submitted</span>
          ) : (
            <span className="btn btn-gradient btn-pill" onClick={handleSubmit}>
              Submit
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferingReviewSubmit;
