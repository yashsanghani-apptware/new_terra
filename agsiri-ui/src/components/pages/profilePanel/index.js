import React, { useEffect, useState } from "react";
import { Col, Container, Row, TabContent, TabPane } from "reactstrap";
import { useSearchParams } from "next/navigation";
import { updateData } from "@/utils/postData";
import { BASE_URL } from "@/config/apiBaseUrls";
import ProfilePanelSidebar from "./ProfilePanelSidebar";
import UserProfile from "./userProfile";
import SubscriptionForm from "./userSubscription";
import InvestorAccountsForm from "./investorAccounts";
import PasswordForm from "./passwordForm";
import { PROFILE_TABS } from "@/constValues/constValues";
import BeneficiaryForm from "./benificiaryForm";
import { toast } from "react-toastify";

const BodyContent = ({ active }) => {
  // PROFILE DATA //
  const [userDetails, setUserDetails] = useState(null);

  // USER PROFILE FORM //
  const [userProfileFormValues, setUserProfileFormValues] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    phone_number: "",
    date_of_birth: "",
    street_address: "",
    address_locality: "",
    address_region: "",
    postal_code: "",
    address_country: "",
  });

  // Fetch user details from localStorage
  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      const user = JSON.parse(storedUserDetails);
      setUserDetails(user);
      setUserProfileFormValues({
        first_name: user.firstName,
        last_name: user.familyName,
        email_address: user.email,
        phone_number: user.telephone || "",
        date_of_birth: user.dateOfBirth || "",
        street_address: user.address?.streetAddress || "",
        address_locality: user.address?.addressLocality || "",
        address_region: user.address?.addressRegion || "",
        postal_code: user.address?.postalCode || "",
        address_country: user.address?.addressCountry || "",
      });
    }
  }, []);

  /**
   * Saves the user profile to the server. Updates the user details in localStorage
   * and the state if the request is successful.
   */
  const handleProfileSave = async () => {
    const payload = {
      name: userProfileFormValues.first_name,
      givenName: userProfileFormValues.first_name,
      familyName: userProfileFormValues.last_name,
      email: userProfileFormValues.email_address,
      //   username: userProfileFormValues.email_address, // ENABLE THIS ONCE THE COMPLETE USER ONBOARDING FLOW IS DONE
      telephone: userProfileFormValues.phone_number,
      dateOfBirth: userProfileFormValues.date_of_birth,
      address: {
        streetAddress: userProfileFormValues.street_address,
        addressLocality: userProfileFormValues.address_locality,
        postalCode: userProfileFormValues.postal_code,
        addressCountry: userProfileFormValues.address_country,
        addressRegion: userProfileFormValues.address_region,
      },
    };
    const res = await updateData(
      payload,
      `${BASE_URL.POLICY}/users/${userDetails._id}`
    );
    if (res.status == 200) {
      const user = res.data;
      localStorage.setItem("userDetails", JSON.stringify(user));
      setUserDetails(user);
      setUserProfileFormValues({
        first_name: user.givenName,
        last_name: user.familyName,
        email_address: user.email,
        phone_number: user.telephone,
        date_of_birth: user.dateOfBirth,
        street_address: user.address.streetAddress,
        address_locality: user.address.addressLocality,
        address_region: user.address.addressRegion,
        postal_code: user.address.postalCode,
        address_country: user.address.addressCountry,
      });
      toast.success(t("PROFILE_UPDATE_SUCCESS"));
    }
  };
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
  const [loading, setLoading] = useState(false);
  const [offeringSubmitted, setOfferingSubmitted] = useState(false);
  const [offeringId, setOfferingId] = useState();

  const handleSaveNext = (tabId) => {
    setActiveTab(tabId);
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

  return (
    <section className="user-dashboard small-section">
      <Container>
        <Row>
          <ProfilePanelSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userDetails={userDetails}
          />
          <Col lg="9">
            <TabContent activeTab={activeTab}>
              <TabPane tabId={PROFILE_TABS[0].id}>
                <UserProfile
                  userProfileFormValues={userProfileFormValues}
                  setUserProfileFormValues={setUserProfileFormValues}
                  handleSave={handleProfileSave}
                />
              </TabPane>
            </TabContent>
            <TabContent activeTab={activeTab}>
              <TabPane tabId={PROFILE_TABS[1].id}>
                <BeneficiaryForm userDetails={userDetails} />
              </TabPane>
            </TabContent>
            <TabContent activeTab={activeTab}>
              <TabPane tabId={PROFILE_TABS[2].id}>
                <SubscriptionForm userDetails={userDetails} />
              </TabPane>
            </TabContent>
            <TabContent activeTab={activeTab}>
              <TabPane tabId={PROFILE_TABS[3].id}>
                <InvestorAccountsForm
                  userDetails={userDetails}
                  countriesList={[
                    "USA",
                    "India",
                    "Canada",
                    "Germany",
                    "Australia",
                  ]}
                  setActiveTab={setActiveTab}
                  handleSubmit={handleSaveNext}
                />
              </TabPane>
            </TabContent>
            <TabContent activeTab={activeTab}>
              <TabPane tabId={PROFILE_TABS[4].id}>
                <PasswordForm
                  userDetails={userDetails}
                />
              </TabPane>
            </TabContent>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="Security">
                {loading ? (
                  <>Fetching data</>
                ) : (
                  activeTab == "Security" && (
                    <></>
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
