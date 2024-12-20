import React from "react";
import { Col, Row } from "reactstrap";

const DetailsDeskBox = ({ singleListingData }) => {
  return (
    <div className='desc-box' id='details'>
      <div className='page-section'>
        <h4 className='content-title'>Property Details</h4>

        <Row>
          <Col md='6' xl='6' style={{ borderBottom: "thick double #2222" }}>
            <ul className='property-list-details mb-4 !mb-0 mt-4 !mt-0'>
              {/* Parking Section */}
              {singleListingData?.property_details?.parking?.type && (
                <li>
                  <i className='fas fa-car'></i>
                  <strong> Parking:</strong>
                  <ul>
                    {singleListingData?.property_details?.parking?.type ? (
                      <li> - Parking Type: {singleListingData?.property_details?.parking?.type}</li>
                    ): ""}
                    {singleListingData?.property_details?.parking?.number_of_spaces ? (
                      <li> - Garage # of Spaces: {singleListingData?.property_details?.parking?.number_of_spaces}</li>
                    ): ""}
                  </ul>
                </li>
              )}
            </ul>
          </Col>

          <Col md='6' xl='6' style={{ borderBottom: "thick double #2222" }}>
            <ul className='property-list-details mb-4 !mb-0 mt-4 !mt-0'>
              {/* Interior Section */}
              <li>
                <i className='fas fa-bed'></i>
                <strong> Interior:</strong>
                <ul>
                  {singleListingData?.public_facts?.Beds && (
                    <li> - Bedrooms: {singleListingData?.public_facts?.Beds}</li>
                  )}
                  {singleListingData?.public_facts?.Baths && (
                    <li> - Bathrooms: {singleListingData?.public_facts?.Baths} Full</li>
                  )}
                  {singleListingData?.property_details?.exterior?.property_information?.Living_Area && (
                    <li> - Living Area: {singleListingData?.property_details?.exterior?.property_information?.Living_Area} sq ft</li>
                  )}
                  {singleListingData?.property_details?.interior?.fireplace?.["#_of_fireplaces_total"] && (
                    <li> - Fireplaces: {singleListingData?.property_details?.interior?.fireplace?.["#_of_fireplaces_total"]} (Wood Burning)</li>
                  )}
                </ul>
              </li>
            </ul>
          </Col>

          <Col md='6' xl='6' style={{ borderBottom: "thick double #2222" }}>
            <ul className='property-list-details mb-4 !mb-0 mt-4 !mt-0'>
              {/* Exterior Section */}
              <li>
                <i className='fas fa-home'></i>
                <strong> Exterior:</strong>
                <ul>
                  {singleListingData?.public_facts?.["Lot Size"] && (
                    <li> - Lot Size: {singleListingData?.public_facts?.["Lot Size"]} acres</li>
                  )}
                  {singleListingData?.property_details?.exterior?.lot_information?.Lot_Features && (
                    <li> - Lot Features: {singleListingData?.property_details?.exterior?.lot_information?.Lot_Features}</li>
                  )}
                  {singleListingData?.property_details?.exterior?.features?.Other_Structures && (
                    <li> - Structures: {singleListingData?.property_details?.exterior?.features?.Other_Structures}</li>
                  )}
                  {singleListingData?.property_details?.exterior?.features?.Roof && (
                    <li> - Roof: {singleListingData?.property_details?.exterior?.features?.Roof}</li>
                  )}
                  {singleListingData?.property_details?.exterior?.features?.Fencing && (
                    <li> - Fencing: {singleListingData?.property_details?.exterior?.features?.Fencing}</li>
                  )}
                  {singleListingData?.property_details?.exterior?.features?.Exterior_Features && (
                    <li> - Exterior Features: {singleListingData?.property_details?.exterior?.features?.Exterior_Features}</li>
                  )}
                </ul>
              </li>
            </ul>
          </Col>

          <Col md='6' xl='6' style={{ borderBottom: "thick double #2222" }}>
            <ul className='property-list-details mb-4 !mb-0 mt-4 !mt-0'>
              {/* Financial Section */}
              <li>
                <i className='fas fa-money-bill-wave'></i>
                <strong> Financial:</strong>
                <ul>
                  {singleListingData?.property_details?.financial?.TaxInformation?.Tax_Annual_Amount && (
                    <li> - Annual Taxes: {singleListingData?.property_details?.financial?.TaxInformation?.Tax_Annual_Amount}</li>
                  )}
                  {singleListingData?.property_details?.financial?.TaxInformation?.Tax_Assessed_Value && (
                    <li> - Assessed Value: {singleListingData?.property_details?.financial?.TaxInformation?.Tax_Assessed_Value}</li>
                  )}
                </ul>
              </li>
            </ul>
          </Col>

          <Col md='6' xl='6' style={{ borderBottom: "thick double #2222" }}>
            <ul className='property-list-details mb-4 !mb-0 mt-4 !mt-0'>
              {/* Utilities Section */}
              <li>
                <i className='fas fa-bolt'></i>
                <strong> Utilities:</strong>
                <ul>
                  {singleListingData?.property_details?.utilities?.heating_and_cooling?.Heating && (
                    <li> - Heating: {singleListingData?.property_details?.utilities?.heating_and_cooling?.Heating}</li>
                  )}
                  {singleListingData?.property_details?.utilities?.heating_and_cooling?.Cooling && (
                    <li> - Cooling: {singleListingData?.property_details?.utilities?.heating_and_cooling?.Cooling}</li>
                  )}
                  {singleListingData?.property_details?.utilities?.utility?.Water_Source && (
                    <li> - Water Source: {singleListingData?.property_details?.utilities?.utility?.Water_Source}</li>
                  )}
                  {singleListingData?.property_details?.utilities?.utility?.Sewer && (
                    <li> - Sewer: {singleListingData?.property_details?.utilities?.utility?.Sewer}</li>
                  )}
                  {singleListingData?.property_details?.utilities?.utility?.Electric && (
                    <li> - Electric: {singleListingData?.property_details?.utilities?.utility?.Electric}</li>
                  )}
                </ul>
              </li>
            </ul>
          </Col>

          <Col md='6' xl='6' style={{ borderBottom: "thick double #2222" }}>
            <ul className='property-list-details mb-4 !mb-0 mt-4 !mt-0'>
              {/* Location Section */}
              <li>
                <i className='fas fa-map-marker-alt'></i>
                <strong> Location:</strong>
                <ul>
                  {singleListingData?.property_details?.location?.school_information?.School_District && (
                    <li> - School District: {singleListingData?.property_details?.location?.school_information?.School_District}</li>
                  )}
                  {singleListingData?.schools && (
                    <li>
                      - Nearby Schools:
                      <ul>
                        <li>
                          {typeof(singleListingData.schools) === 'string' && singleListingData.schools}
                        </li>
                        {typeof(singleListingData.schools) === "object" && Object.entries(singleListingData.schools).map(([schoolType, schoolName], index) => (
                          <li key={index}>
                            {schoolType.replace('_', ' ')}: {schoolName}
                          </li>
                        ))}
                      </ul>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </Col>

          <Col md='6' xl='6'>
            <ul className='property-list-details mb-4 !mb-0 mt-4 !mt-0'>
              {/* Public Facts Section */}
              <li>
                <i className='fas fa-info-circle'></i>
                <strong> Public Facts:</strong>
                <ul>
                  {singleListingData?.type && (
                    <li> - Property Type: {singleListingData?.type}</li>
                  )}
                  {singleListingData?.public_facts?.["Year_Built"] && (
                    <li> - Year Built: {singleListingData?.public_facts?.["Year_Built"]}</li>
                  )}
                  {singleListingData?.public_facts?.Stories && (
                    <li> - Stories: {singleListingData?.public_facts?.Stories}</li>
                  )}
                  {singleListingData?.public_facts?.Total_Sq_Ft_ && (
                    <li> - Total Square Feet: {singleListingData?.public_facts?.Total_Sq_Ft_}</li>
                  )}
                </ul>
              </li>
            </ul>
          </Col>

          <Col md='6' xl='6'>
            <ul className='property-list-details mb-4 !mb-0 mt-4 !mt-0'>
              {/* Sales and Tax Section */}
              <li>
                <i className='fas fa-file-invoice-dollar'></i>
                <strong> Sales and Tax:</strong>
                <ul>
                  {Array.isArray(singleListingData?.sales_and_tax?.sales_history) && singleListingData?.sales_and_tax?.sales_history?.map((sale, index) => (
                    <li key={index}>
                      - {sale.Date}: {sale.status} - {sale.Price}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </Col>
        </Row>

        {/* <h4 className='content-title mt-4'>Attachments</h4>
          <a className='attach-file'>
            <i className='far fa-file-pdf'></i>Demo Property Document{" "}
          </a>
        */}

      </div>
    </div>
  );
};

export default DetailsDeskBox;
