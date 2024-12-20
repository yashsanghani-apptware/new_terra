/**
 * It returns the children of the component, the top title, the image section, the gallery box, the
 * single property section, the reviews desk box, the contact info, the exploration, the filter, the
 * featured, the recently added, the mortgage, and the related property
 * @param props - {
 * @returns A React component.
 */
import React from "react";
import { Col, Container, Row } from "reactstrap";
import TopTitle from "../stickyTabOrClassic/TopTitle";
import Sidebar from "../../../layout/sidebarLayout/Sidebar";
import ReviewsDeskBox from "../stickyTabOrClassic/ReviewsDeskBox";
import ContactInfo from "../../../layout/sidebarLayout/ContactInfo";
import Exploration from "../../../layout/sidebarLayout/Exploration";
import Mortgage from "../../../layout/sidebarLayout/Mortgage";
import Featured from "../../../layout/sidebarLayout/Featured";
import Filter from "../../../layout/sidebarLayout/Filter";
import RecentlyAdded from "../../../layout/sidebarLayout/RecentlyAdded";
import RelatedProperty from "../stickyTabOrClassic/RelatedProperty";
import GalleryBox from "./GalleryBox";
import ImageSection from "./Image";
import SinglePropertySection from "./SinglePropertySection";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getAPIData, getListingMedia, getOfferDetails } from "@/utils/getData";
import SliderBreadcrumbSection from "../stickyTabOrClassic/SliderBreadcrumb";
import GallerySlider from "../stickyTabOrClassic/GallerySlider";
import { BASE_URL } from "@/config/apiBaseUrls";

const BodyContent = (props) => {
  const searchParams = useSearchParams();
  const currentPropertyId = searchParams?.get("id");
  const currentPage = searchParams?.get("toPage");

  const [singleListingData, setSinglelistingData] = useState(null);
  const [images, setImages] = useState();
  const [imagesMeta, setImagesMeta] = useState();
  const [videos, setVideos] = useState();
  const [offerDetails, setOfferDetails] = useState();

  useEffect(() => {
    getAPIData(`${BASE_URL.LISTING}/listings/${currentPropertyId}`).then(
      (res) => {
        setSinglelistingData(res);
      }
    );
  }, []);

  useEffect(() => {
    getListingMedia(`/listings/image/${currentPropertyId}`).then((res) => {
      setImages(res.data.images);
      setImagesMeta(res.data.imagesMeta);
      setVideos(res.data.videos);
    });

    getOfferDetails(`/offerings/${currentPropertyId}`).then(
      (res) => {
        setOfferDetails(res.data);
      }
    );
  }, []);

  useEffect(() => {
    // If there are multiple pages, start fetching other pages
    if (
      imagesMeta?.totalPages > 1 &&
      images?.length <= imagesMeta?.totalItems
    ) {
      const totalPages = imagesMeta.totalPages;
      let allImages = images; // Store all images
      let imagesMetaData = imagesMeta;
      let count = 2;

      // Fetch all remaining pages in a loop
      const fetchAllPages = async () => {
        while (count <= totalPages) {
          await getListingMedia(
            `/listings/image/${currentPropertyId}?page=${count}`
          ).then((res) => {
            allImages = allImages.concat(res.data.images);
            setImages(allImages);
            count += 1;
          });
        }
      };

      // Start fetching all pages
      fetchAllPages();
    }
  }, [imagesMeta]);

  return (
    <>
      {/* {props.children} */}
      <SliderBreadcrumbSection
        singleListingData={singleListingData}
        images={images}
        videos={videos}
        currentPage={currentPage}
        offerDetails={offerDetails}
        fromOfferScreen={false}
      />
      <section className="without-top property-main small-section">
        {/* <TopTitle singleData={props.singleData} id={props.id}/> */}
      </section>
      <section className="single-property mt-0 pt-0">
        <Container>
          <Row className=" ratio_55">
            <Col xl="9" lg="8">
              <div className="description-section tab-description">
                {/* {props.imgSection && <ImageSection />} */}
                {/* <ImageSection /> */}
                {/* <GalleryBox images={images} /> */}
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
                {/* <ReviewsDeskBox /> */}
              </div>
            </Col>
            <Sidebar singleListingData={singleListingData}>
              <ContactInfo singleListingData={singleListingData} />
              {/* <Exploration /> */}
              {/* <Filt er /> */}
              {/* <Featured /> */}
              {/* <RecentlyAdded /> */}
              {/* <Mortgage /> */}
            </Sidebar>
          </Row>
        </Container>
        <div className="related-abjust">{/* <RelatedProperty /> */}</div>
      </section>
    </>
  );
};

export default BodyContent;
