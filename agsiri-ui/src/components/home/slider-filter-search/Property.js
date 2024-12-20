/**
 * It takes in an array of objects and returns a row of property boxes
 * @returns A section with a container, row, and col.
 */
import React from "react";
import { Col, Container, Row } from "reactstrap";
import { LatestForSale, ListingCards, Rent } from "@/constValues/constValues";
import PropertyBox from "../../elements/propertyBoxs/PropertyBox";

const PropertySection = (value1, listingCardData) => {
  const { value, range} = value1;
  return (
    <section className='property-section'>
      {console.log("listingCardData", listingCardData)}
      <Container>
        <Row className='ratio_55'>
          <Col>
            <div className='title-1'>
              <span className='label label-gradient'>{Rent}</span>
              <h2>{ListingCards}</h2>
              <hr />
            </div>
            <Row className='property-2 column-space'>
              {value &&
                value.slice(`${range ? range[0] : 0}`, `${range ? range[1] : 6}`).map((data, i) => (
                  <Col xl='4' md='6' className='wow fadeInUp' key={i}>
                    <PropertyBox data={data} />
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PropertySection;
