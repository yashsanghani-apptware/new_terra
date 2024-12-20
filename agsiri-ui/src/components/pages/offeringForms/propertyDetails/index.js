import GallerySlider from "@/components/property/stickyTabOrClassic/GallerySlider";
import SliderBreadcrumbSection from "@/components/property/stickyTabOrClassic/SliderBreadcrumb";
import SinglePropertySection from "@/components/property/tabPanelPages/SinglePropertySection";
import { getListingMedia } from "@/utils/getData";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

const PropertyDetails = ({
  singleListingData,
  fromOfferScreen,
  setActiveTab,
  review,
}) => {
  const [images, setImages] = useState();
  const [imagesMeta, setImagesMeta] = useState();
  const [videos, setVideos] = useState();

  useEffect(() => {
    getListingMedia(`/listings/image/${singleListingData?.listing_id}`).then(
      (res) => {
        setImages(res.data.images);
        setImagesMeta(res.data.imagesMeta);
        setVideos(res.data.videos);
      }
    );
  }, []);
  return (
    <div className="dashboard-content">
      <div
        className="editor-wrapper"
        style={review ? { maxWidth: "100%" } : {}}
      >
        <>
          <SliderBreadcrumbSection
            singleListingData={singleListingData}
            images={images}
            videos={videos}
            currentPage={1}
            fromOfferScreen={true}
            // offerDetails={offerDetails}
          />
          <section className="single-property mt-0 pt-0">
            <Container>
              <Row className=" ratio_55">
                <Col xl="9" lg="8" style={{ width: "100%" }}>
                  <div className="description-section tab-description">
                    {images?.length > 0 ? (
                      <section className="gallery-slider mt-0 pt-0">
                        <GallerySlider images={images} />
                      </section>
                    ) : null}
                    <SinglePropertySection
                      singleListingData={singleListingData}
                      images={images}
                      videos={videos}
                    />
                  </div>
                </Col>
                {/* <Sidebar singleListingData={singleListingData}>
                  <ContactInfo singleListingData={singleListingData} />
                </Sidebar> */}
              </Row>
            </Container>
            <div className="related-abjust"></div>
          </section>
        </>
        <div className="btn-save-next">
          {!review && (
            <span
              className="btn btn-gradient btn-pill"
              onClick={() => setActiveTab("Finincials")}
            >
              Save & Next
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
