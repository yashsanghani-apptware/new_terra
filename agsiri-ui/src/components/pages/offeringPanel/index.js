import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState, Fragment } from "react";
import { Col, Container, Row } from "reactstrap";
import OfferingSidebar from "./OfferingSidebar";
import InvestMentMemorandum from "../offeringForms/investmentMemorandum";
import OfferingOverview from "../offeringForms/offeringOverview";
import PropertyDetails from "../offeringForms/propertyDetails";
import FinincialsDetails from "../offeringForms/financialsDetails";
import OfferingDocuments from "../offeringForms/offeringDocuments";
import { Box } from "@mui/material";
import Sidebar from "@/layout/sidebarLayout/Sidebar";
import { getAPIData } from "@/utils/getData";
import { BASE_URL } from "@/config/apiBaseUrls";
import InvestMentDetails from "./InvestmentDetails";
import FinancialDetails from "./FinancialDetails";
import SubscriptionSlider from "./SubscriptionSlider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const BodyContent = ({ active }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const data =
    JSON.parse(searchParams?.get("data")) || searchParams?.get("data");
  const [activeTab, setActiveTab] = useState(active);
  const offeringDetails = JSON.parse(searchParams?.get("offerDetails"));
  const [offeringFormValues, setOfferingFormValues] = useState({
    details: {},
    investment_overview: {},
    financial_details: {},
    documents: {},
    isViewMode: false,
  });
  const [loading, setLoading] = useState(false);
  const [offeringData, setOfferingData] = useState();
  const [path, setPath] = useState();

  useEffect(() => {
    setPath(pathname.split("/"));
  }, [router.pathname]);
  useEffect(() => {
    if (offeringDetails.offering_id)
      getOfferingData(offeringDetails.offering_id);
  }, []);

  const getOfferingData = async (offeringId) => {
    setLoading(true);
    const data = await getAPIData(
      `${BASE_URL.OFFERING}/offerings/${offeringId}`
    );
    if (data.Offering) {
      setOfferingFormValues({
        ...offeringFormValues,
        details: data.Offering.details,
        investment_overview: data.Offering.investment_overview.attr,
        financial_details: data.Offering.financial_details,
        documents: data.Offering.documents,
        isViewMode: true,
      });

      setOfferingData(data.Offering);
    }

    setLoading(false);
  };

  const [flag, setFlag] = useState(false);
  useEffect(() => {
    setFlag(true);
  }, []);

  // Refs for each section to scroll to
  const investmentRef = useRef(null);
  const overviewRef = useRef(null);
  const propertyRef = useRef(null);
  const financialRef = useRef(null);
  const documentRef = useRef(null);

  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="user-dashboard small-section">
      <Container>
        {!offeringDetails.is_user_subscribed ? (
          <Row style={{ marginBottom: "22em", justifyContent: "center" }}>
            <SubscriptionSlider offeringData={offeringData} />
          </Row>
        ) : null}
        <Container>
          <div className={`breadcrumb-content`}>
            <nav aria-label="breadcrumb" className="theme-breadcrumb">
              <ol className="breadcrumb">
                {path?.length > 2 &&
                  !path?.includes("login") &&
                  path?.map((data, i) => (
                    <Fragment key={i}>
                      {data && (
                        <Link
                          href={`${data === "offering" ? `/${data}` : "#"}`}
                          className="breadcrumb-item"
                        >
                          <span>{data.replaceAll("-", " ")} </span>
                        </Link>
                      )}
                    </Fragment>
                  ))}
              </ol>
            </nav>
          </div>
        </Container>
        <Row>
          <OfferingSidebar
            data={data}
            offeringData={offeringData}
            onTabClick={(tabId) => {
              // Scroll to the respective section based on the tab clicked
              switch (tabId) {
                case "Investment Highlights":
                  scrollToSection(investmentRef);
                  break;
                case "Overview":
                  scrollToSection(overviewRef);
                  break;
                case "Property Details":
                  scrollToSection(propertyRef);
                  break;
                case "Financials":
                  scrollToSection(financialRef);
                  break;
                case "Documents":
                  scrollToSection(documentRef);
                  break;
                default:
                  break;
              }
            }}
          />
          <Col lg="9">
            {/* Display all sections initially */}
            <Box>
              <section
                className="mb-0 pt-0"
                style={{ paddingBottom: "35px" }}
                id="investment-info"
                ref={propertyRef}
              >
                <PropertyDetails
                  singleListingData={data}
                  fromOfferScreen={true}
                  review={true}
                />
              </section>

              <section
                className="mb-0 pt-0 "
                style={{ paddingBottom: 0 }}
                id="overview-info"
                ref={overviewRef}
              >
                {flag && (
                  <OfferingOverview
                    offeringDetails={offeringDetails}
                    overviewData={offeringFormValues.investment_overview}
                    review={true}
                    id="reviewOverview123"
                  />
                )}
              </section>

              <section
                className="mb-0 pt-0"
                style={{ paddingBottom: "35px" }}
                id="property-info"
                ref={investmentRef}
              >
                <InvestMentDetails
                  detailsData={offeringFormValues}
                  review={true}
                />
              </section>

              <section
                className="mb-0 pt-0 pb-5"
                style={{ paddingBottom: 0 }}
                id="financial-info"
                ref={financialRef}
              >
                <FinancialDetails
                  detailsData={offeringFormValues}
                  review={true}
                />
              </section>

              <section
                className="mb-0 pt-0 "
                id="document-info"
                ref={documentRef}
              >
                <OfferingDocuments
                  offeringDetails={offeringDetails}
                  documentsDetails={offeringFormValues.documents}
                  offeringId={offeringDetails.offering_id}
                  review={true}
                />
              </section>
            </Box>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BodyContent;
