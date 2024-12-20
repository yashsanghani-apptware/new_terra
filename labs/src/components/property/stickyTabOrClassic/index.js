/**
 * It returns a section with a container with a row with a sidebar and a single property section
 * @returns The return statement is used to return a value from a function.
 */
import React from "react";
import { Col, Container, Row } from "reactstrap";
import ContactInfo from "../../../layout/sidebarLayout/ContactInfo";
import Exploration from "../../../layout/sidebarLayout/Exploration";
import Featured from "../../../layout/sidebarLayout/Featured";
import Filter from "../../../layout/sidebarLayout/Filter";
import Mortgage from "../../../layout/sidebarLayout/Mortgage";
import RecentlyAdded from "../../../layout/sidebarLayout/RecentlyAdded";
import Sidebar from "../../../layout/sidebarLayout/Sidebar";
import NoSsr from "../../../utils/NoSsr";
import ReviewsDeskBox from "../stickyTabOrClassic/ReviewsDeskBox";
import RelatedProperty from "./RelatedProperty";
import GalleryBox from "../tabPanelPages/GalleryBox";
import SinglePropertySection from "./SingleProperty";
import SliderBreadcrumbSection from "./SliderBreadcrumb";

const BodyContent = (props) => {
  return (
    <>
       <SliderBreadcrumbSection />
      
      <section className="single-property mt-0 pt-0">
        <Container>
          <Row className=" ratio_55">
            <Col xl="9" lg="8">
              <div className="description-section tab-description">
                {props.imgSection && <ImageSection />}
                <GalleryBox exploration={props.exploration} />
                <SinglePropertySection />
                <ReviewsDeskBox />
              </div>
            </Col>
            <Sidebar>
              <ContactInfo />
              <Exploration />
              <Filter />
              <Featured />
              <RecentlyAdded />
              <Mortgage />
            </Sidebar >
          </Row>
        </Container>
        <div className="related-abjust">
          <RelatedProperty />
        </div>
      </section>
    </>
  );
};


export default BodyContent;
