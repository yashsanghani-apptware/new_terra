/**
 * It returns a section with a container with a row with a sidebar and a single property section
 * @returns The return statement is used to return a value from a function.
 */
import React from "react";
import { Container, Row } from "reactstrap";
import ContactInfo from "../../../layout/sidebarLayout/ContactInfo";
import Exploration from "../../../layout/sidebarLayout/Exploration";
import Featured from "../../../layout/sidebarLayout/Featured";
import Filter from "../../../layout/sidebarLayout/Filter";
import Mortgage from "../../../layout/sidebarLayout/Mortgage";
import RecentlyAdded from "../../../layout/sidebarLayout/RecentlyAdded";
import Sidebar from "../../../layout/sidebarLayout/Sidebar";
import NoSsr from "../../../utils/NoSsr";
import RelatedProperty from "./RelatedProperty";
import SinglePropertySection from "./SingleProperty";
import SliderBreadcrumbSection from "./SliderBreadcrumb";
import { getAPIData, getListingMedia } from "@/utils/getData";
import { useParams } from 'next/navigation'

import { useState, useEffect } from "react";
import { Router, useRouter } from "next/router";
import { useSearchParams } from 'next/navigation'
import { BASE_URL } from "@/config/apiBaseUrls";


const BodyContent = (props) => {
  const searchParams = useSearchParams();
  const currentPropertyId = searchParams?.get('id');

  const [singleListingData, setSinglelistingData] = useState(null);
  const [images, setImages] = useState();
  const [videos, setVideos] = useState();

  useEffect(() => {
    getAPIData(`${BASE_URL.LISTING}/listings/${currentPropertyId}`).then((res) => {
      setSinglelistingData(res);
    })
  }, []);

  useEffect(() => {
    getListingMedia(`/listings/image/${currentPropertyId}`).then(res => {
      setImages(res.data.images);
      setVideos(res.data.videos);
    });
  }, []);

  console.log({images, videos}, "images, videos =============")
  return (
    <NoSsr>
      <SliderBreadcrumbSection singleListingData={singleListingData} images={images} videos={videos}/>
      <section className="single-property">
        <Container>
          <Row className=" ratio_65">
            <Sidebar mortgage={true} side={"right"} singleProperty={true}>
              <ContactInfo singleListingData={singleListingData} />
              <Exploration />
              <Filter sm={12} />
              <Featured />
              <RecentlyAdded />
              <Mortgage />
            </Sidebar>
            <SinglePropertySection singleListingData={singleListingData} images={images} videos={videos} />
          </Row>
        </Container>
      </section>
      <RelatedProperty />
    </NoSsr>
  );
};

export default BodyContent;
