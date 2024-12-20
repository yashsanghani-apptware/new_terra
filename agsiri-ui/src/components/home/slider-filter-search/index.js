/**
 * It fetches data from the API and then renders the data in the UI
 * @returns The return value of the function is the value of the last expression in the function body.
 */
import { AppPropertyData } from "@/data/appPropertyData";
import { getAPIData, getData } from "@/utils/getData";
import { Fragment, useEffect, useState } from "react";
import AboutSection from "./About";
import BannerSection from "./Banner";
import BrandSection from "./Brand";
import CitiesWisePropertySection from "./CitiesWiseProperty";
import FeatureSection from "./Feature";
import HomeBannerSection from "./HomeBanner";
import OfferSection from "./Offer";
import PropertySection from "./Property";
import SalePropertySection from "./SaleProperty";
import TestimonialSection from "./Testimonial";
import { BASE_URL } from "@/config/apiBaseUrls";

const BodyContent = () => {
  const [value, setValue] = useState();
  const [listingCardData, setListingCardData] = useState();
  const [clientData, setClientData] = useState();

  useEffect(() => {
    getData(`/api/property`)
      .then((res) => {
        setValue(res.data);
      })
      .catch((error) => console.log("Error", error));
    getData(`/api/client-agent`)
      .then((res) => {
        setClientData(res.data);
      })
      .catch((error) => console.log("Error", error));
    getAPIData(`${BASE_URL.LISTING}/listings`).then((res) => {
      setListingCardData(res);
      // setValue(res.data);
    })
  }, []);
  return (
    <Fragment>
      {/* <HomeBannerSection /> */}
      {/* <SalePropertySection value={value?.LatestForSalePropertyData} /> */}
      {/* <FeatureSection value={value?.FeaturedProperty} /> */}
      <PropertySection 
      value1={value?.LatestPropertyData} 
      listingCardData={listingCardData}/>
      {/* <OfferSection value={AppPropertyData.OurNewOffer} /> */}
      {/* <CitiesWisePropertySection value={value?.FindPropertiesInTheseCities} /> */}
      {/* <BannerSection /> */}
      {/* <AboutSection value={clientData?.MeetOurAgent} /> */}
      {/* <TestimonialSection value={clientData?.HappyClient} normal={true} /> */}
      {/* <BrandSection /> */}
    </Fragment>
  );
};

export default BodyContent;
