import React, { useEffect, useState } from "react";
import { Col, Container, Row, TabContent, TabPane } from "reactstrap";
import CardsPaymentTab from "./cards&paymentTab";
import FavoritesTab from "./favouritesTab";
import UserPanelSidebar from "./UserPanelSidebar";
import InvestMentMemorandum from "../offeringForms/investmentMemorandum";
import { useSearchParams } from "next/navigation";
import OfferingOverview from "../offeringForms/offeringOverview";
import PropertyDetails from "../offeringForms/propertyDetails";
import FinincialsDetails from "../offeringForms/financialsDetails";
import OfferingDocuments from "../offeringForms/offeringDocuments";
import { createData, updateData } from "@/utils/postData";
import { BASE_URL } from "@/config/apiBaseUrls";
import { getAPIData } from "@/utils/getData";
import Loading from "@/app/loading";
import OfferingReviewSubmit from "../offeringForms/offeringReviewSubmit";
import { Stepper, Step, StepLabel, Tooltip } from "@mui/material";
import { CREATE_OFFER_STEPS } from "@/constValues/constValues";

const BodyContent = ({ active }) => {
  const searchParams = useSearchParams();
  const data =
    JSON.parse(searchParams?.get("data")) || searchParams?.get("data");
  const [activeTab, setActiveTab] = useState(active);
  const [overViewFlag, setOverviewFlag] = useState(false);
  const offeringDetails = JSON.parse(searchParams?.get("offerDetails"));

  const [offeringFormValues, setOfferingFormValues] = useState({
    details: {},
    investment_overview: {},
    financial_details: {},
    documents: {},
  });
  const [offeringName, setOfferingName] = useState();
  const [offeringStatus, setOfferingStatus] = useState();
  const [loading, setLoading] = useState(true);
  const [offeringSubmitted, setOfferingSubmitted] = useState(false);
  const [offeringId, setOfferingId] = useState();
  const [offeringCreateFlag, setOfferingCreateFlag] = useState(false);
  const [cropList, setCropList] = useState([]);
  useEffect(() => {
    if (!offeringDetails.offering_id && !offeringCreateFlag) {
      const payload = {
        listing_id: data.listing_id,
        name: `${
          data?.address?.house_number ? data?.address?.house_number : ""
        } ${data?.name}`,
      };
      setOfferingName(
        `${data?.address?.house_number ? data?.address?.house_number : ""} ${
          data?.name
        }`
      );
      setOfferingStatus("DRAFT");
      if (!offeringCreateFlag) {
        createOffering(payload);
      }
    }
  }, [offeringDetails]);

  const createOffering = async (payload) => {
    const response = await createData(
      payload,
      `${BASE_URL.OFFERING}/offerings`
    );
    if (response.status == 201) {
      setOfferingCreateFlag(true);
      getOfferingData(response.data.offering_id);
    }
  };
  useEffect(() => {
    getCrops();
    if (offeringDetails.offering_id)
      getOfferingData(offeringDetails.offering_id);
  }, []);
  const getCrops = async () => {
    const res = await getAPIData(`${BASE_URL.OFFERING}/offerings/crops`);
    if (res && res.crops?.length) {
      setCropList(res.crops);
    }
  };
  const getOfferingData = async (offeringId) => {
    setLoading(true);
    const res = await getAPIData(
      `${BASE_URL.OFFERING}/offerings/${offeringId}`
    );
    setLoading(false);
    if (res.Offering) {
      setOfferingFormValues({
        ...offeringFormValues,
        details: res.Offering.details ? res.Offering.details : {},
        investment_overview: res.Offering.investment_overview?.attr
          ? res.Offering.investment_overview.attr
          : {},
        financial_details: res.Offering.financial_details
          ? res.Offering.financial_details
          : {},
        documents: res.Offering.documents ? res.Offering.documents : [],
      });
      setOfferingName(res.Offering.name);
      setOfferingStatus(res.Offering.status);
      setOfferingId(res.Offering.offering_id);
    }
  };
  const handleSaveNext = (tabId, formData, formType) => {
    setOfferingFormValues((prevValues) => ({
      ...prevValues,
      [formType]: formData, // Update specific form's data
    }));
    if (tabId === "Overview") {
      setOverviewFlag(true);
    }
    setActiveTab(tabId);
    let investment_overview =
      formType === "investment_overview"
        ? formData
        : offeringFormValues.investment_overview;
    let financial_details =
      formType === "financial_details"
        ? formData
        : offeringFormValues.financial_details;
    let details =
      formType === "details" ? formData : offeringFormValues.details;
    const payload = {
      name: offeringName,
      investment_overview: {
        attr: {
          editorData: investment_overview?.editorData,
        },
      },
      financial_details,
      details,
    };
    let apiId = offeringDetails.offering_id
      ? offeringDetails.offering_id
      : offeringId;
    updateData(payload, `${BASE_URL.OFFERING}/offerings/${apiId}`);
  };

  const handleSubmit = async () => {
    const payload = {
      name: offeringName,
      investment_overview: {
        attr: {
          editorData: offeringFormValues.investment_overview?.editorData,
        },
      },
      financial_details: offeringFormValues.financial_details,
      details: offeringFormValues.details,
      status: "ACTIVE",
    };
    let apiId = offeringDetails.offering_id
      ? offeringDetails.offering_id
      : offeringId;
    const res = await updateData(
      payload,
      `${BASE_URL.OFFERING}/offerings/${apiId}`
    );

    setOfferingSubmitted(true);
  };
  const handleOfferName = (name) => {
    const payload = {
      name: name,
    };
    let apiId = offeringDetails.offering_id
      ? offeringDetails.offering_id
      : offeringId;

    updateData(payload, `${BASE_URL.OFFERING}/offerings/${apiId}`);
  };

  return (
    <section className="user-dashboard small-section">
      <Container>
        <Row style={{ marginBottom: "3em" }}>
          <Col lg="3"></Col>
          <Col lg="8">
            <Stepper
              activeStep={CREATE_OFFER_STEPS.indexOf(activeTab)}
              style={{ maxWidth: "90%" }}
            >
              {CREATE_OFFER_STEPS.map((step, index) => (
                <Tooltip key={index} title={step} placement="top">
                <Step key={index}>
                  <StepLabel></StepLabel>
                </Step>
                </Tooltip>
              ))}
            </Stepper>
          </Col>
        </Row>
        <Row>
          <UserPanelSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            data={data}
            handleOfferName={handleOfferName}
            offeringName={offeringName}
            setOfferingName={setOfferingName}
            offeringStatus={offeringStatus}
            offeringSubmitted={offeringSubmitted}
          />

          <Col lg="9">
            <TabContent activeTab={activeTab}>
              <TabPane tabId={CREATE_OFFER_STEPS[0]}>
                {loading ? (
                  <>Fetching data</>
                ) : (
                  <InvestMentMemorandum
                    handleSaveNext={handleSaveNext}
                    detailsData={offeringFormValues.details}
                    cropList={cropList}
                  />
                )}
              </TabPane>
            </TabContent>
            <TabContent activeTab={activeTab}>
              <TabPane tabId={CREATE_OFFER_STEPS[1]}>
                {loading && overViewFlag ? (
                  <>Fetching data</>
                ) : (
                  activeTab == CREATE_OFFER_STEPS[1] && (
                    <OfferingOverview
                      offeringDetails={offeringDetails}
                      handleSaveNext={handleSaveNext}
                      overviewData={offeringFormValues.investment_overview}
                      setOverviewFlag={setOverviewFlag}
                      id="overview123"
                    />
                  )
                )}
              </TabPane>
            </TabContent>
            <TabContent activeTab={activeTab}>
              <TabPane tabId={CREATE_OFFER_STEPS[2]}>
                <PropertyDetails
                  singleListingData={data}
                  setActiveTab={setActiveTab}
                  fromOfferScreen={true}
                />
              </TabPane>
            </TabContent>
            <TabContent activeTab={activeTab}>
              <TabPane tabId={CREATE_OFFER_STEPS[3]}>
                {loading ? (
                  <>Fetching data</>
                ) : (
                  <FinincialsDetails
                    handleSaveNext={handleSaveNext}
                    financialDetails={offeringFormValues.financial_details}
                  />
                )}
              </TabPane>
            </TabContent>
            <TabContent activeTab={activeTab}>
              <TabPane tabId={CREATE_OFFER_STEPS[4]}>
                {loading ? (
                  <>Fetching data</>
                ) : (
                  <OfferingDocuments
                    offeringDetails={offeringDetails}
                    documentsDetails={offeringFormValues.documents}
                    setActiveTab={setActiveTab}
                    offeringId={offeringId}
                    getOfferingData={getOfferingData}
                  />
                )}
              </TabPane>
            </TabContent>
            <TabContent activeTab={activeTab}>
              <TabPane tabId={CREATE_OFFER_STEPS[5]}>
                {loading ? (
                  <>Fetching data</>
                ) : (
                  activeTab == CREATE_OFFER_STEPS[5] && (
                    <OfferingReviewSubmit
                      offeringFormValues={offeringFormValues}
                      offeringDetails={offeringDetails}
                      singleListingData={data}
                      handleSubmit={handleSubmit}
                      setOverviewFlag={setOverviewFlag}
                      offeringSubmitted={offeringSubmitted}
                    />
                  )
                )}
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BodyContent;
