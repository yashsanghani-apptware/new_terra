import React from "react";
import { Col } from "reactstrap";
import useStickyBar from "../../../utils/useStickyBar";
import useActiveLinkInStickyBar from "../../../utils/useActiveLinkInStickyBar";
import DetailsDeskBox from "./DetailsDeskBox";
import FeatureDeskBox from "./FeatureDeskBox";
import FloorPlanDeskBox from "./FloorPlanDeskBox";
import GalleryDeskBox from "./GalleryDeskBox";
import LocationMapDeskBox from "./LocationMapDeskBox";
import SearchBarDeskBox from "./SearchBarDeskBox";
import VideoDeskBox from "./VideoDeskBox";
import ReviewsDeskBox from "./ReviewsDeskBox";


// API call: 

const SinglePropertySection = ({singleListingData, images, videos}) => {
  const fix = useStickyBar();
  useActiveLinkInStickyBar();

  return (
    <Col xl='9' lg='8'>
      <div className='description-section'>
        <div className='description-details'>
          <SearchBarDeskBox fix={fix}  singleListingData={singleListingData}/>
          <FeatureDeskBox  singleListingData={singleListingData}/>
          <GalleryDeskBox  singleListingData={singleListingData} images={images}/>
          <VideoDeskBox  singleListingData={singleListingData} videos={videos}/>
          <DetailsDeskBox  singleListingData={singleListingData}/>
          <FloorPlanDeskBox   singleListingData={singleListingData}/>
          <LocationMapDeskBox   singleListingData={singleListingData}/>
          <ReviewsDeskBox />
        </div>
      </div>
    </Col>
  );
};

export default SinglePropertySection;
