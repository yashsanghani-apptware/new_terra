import React from "react";
import { Col, Row } from "reactstrap";

const FeatureDeskBox = ({singleListingData}) => {
  return (
    <div className='desc-box' id='feature'>
      <div className='page-section feature-dec'>
        <h4 className='content-title'>features</h4>
        {/* <Row className='single-feature '>
          <Col xxl='3' xl='4' sm='6'>
            <ul>
              <li>
                <i className='fas fa-wifi'></i> Free Wi-Fi
              </li>
              <li>
                <i className='fas fa-hands'></i> Elevator Lift
              </li>
              <li>
                <i className='fas fa-power-off'></i> Power Backup
              </li>
              <li>
                <i className='fas fa-monument'></i> Laundry Service
              </li>
            </ul>
          </Col>
          <Col xxl='3' xl='4' sm='6'>
            <ul>
              <li>
                <i className='fas fa-user-shield'></i> Security Guard
              </li>
              <li>
                <i className='fas fa-video'></i> CCTV
              </li>
              <li>
                <i className='fas fa-door-open'></i> Emergency Exit
              </li>
              <li>
                <i className='fas fa-first-aid'></i> Doctor On Call
              </li>
            </ul>
          </Col>
          <Col xxl='3' xl='4' sm='6'>
            <ul>
              <li>
                <i className='fas fa-shower'></i> Shower
              </li>
              <li>
                <i className='fas fa-car'></i> free Parking in the area
              </li>
              <li>
                <i className='fas fa-fan'></i> Air Conditioning
              </li>
            </ul>
          </Col>
        </Row> */}

{/* <Row className='single-feature '>
  <Col xxl='3' xl='4' sm='6'>
    <ul>
      {singleListingData?.property_details?.utilities?.utility?.Electric &&   <li>
        <i className='fas fa-power-off'></i>  Power Backup: {singleListingData?.property_details?.utilities?.utility?.Electric}
      </li>}
     
      <li>
        <i className='fas fa-shower'></i> Outdoor Shower
      </li>
      <li>
        <i className='fas fa-car'></i> Garage Parking (10 spaces)
      </li>
    </ul>
  </Col>
  <Col xxl='3' xl='4' sm='6'>
    <ul>
      <li>
        <i className='fas fa-user-shield'></i> Security Features
      </li>
      <li>
        <i className='fas fa-fire'></i> Heating Type (Propane/Wood)
      </li>
      <li>
        <i className='fas fa-water'></i> Water Source (Spring)
      </li>
      <li>
        <i className='fas fa-tree'></i> Total Acreage (184.6 acres)
      </li>
    </ul>
  </Col>
  <Col xxl='3' xl='4' sm='6'>
    <ul>
      <li>
        <i className='fas fa-warehouse'></i> Barns for Storage
      </li>
      <li>
        <i className='fas fa-home'></i> Finished Sq. Ft.
      </li>
      <li>
        <i className='fas fa-toolbox'></i> Unfinished Sq. Ft.
      </li>
    </ul>
  </Col>
</Row> */}

<Row className='single-feature '>
          <Col xxl='12' xl='12' sm='12'>
            <ul className="mb-2 !mb-0'" style={{display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              {singleListingData?.property_details?.utilities?.utility?.Electric && (
                <li>
                  <i className='fas fa-bolt'></i> Electric: {singleListingData?.property_details?.utilities?.utility?.Electric}
                </li>
              )}
              {singleListingData?.property_details?.utilities?.utility?.Water_Source && (
                <li>
                  <i className='fas fa-water'></i> Water Source: {singleListingData?.property_details?.utilities?.utility?.Water_Source}
                </li>
              )}
              {singleListingData?.property_details?.utilities?.utility?.Sewer && (
                <li>
                  <i className='fas fa-toilet'></i> Sewer: {singleListingData?.property_details?.utilities?.utility?.Sewer}
                </li>
              )}
              {singleListingData?.property_details?.utilities?.heating_and_cooling?.Heating && (
                <li>
                  <i className='fas fa-fire'></i> Heating: {singleListingData?.property_details?.utilities?.heating_and_cooling?.Heating}
                </li>
              )}
               {singleListingData?.property_details?.utilities?.heating_and_cooling?.Cooling && (
                <li>
                  <i className='fas fa-wind'></i> Cooling: {singleListingData?.property_details?.utilities?.heating_and_cooling?.Cooling}
                </li>
              )}
              {singleListingData?.property_details?.exterior?.features?.Roof && (
                <li>
                  <i className='fas fa-home'></i> Roof: {singleListingData?.property_details?.exterior?.features?.Roof}
                </li>
              )}
            {/* </ul>
          </Col>
          <Col xxl='6' xl='6' sm='6'>
            <ul className="mb-2 !mb-0'"> */}
              {singleListingData?.property_details?.exterior?.features?.Other_Structures && (
                <li>
                  <i className='fas fa-warehouse'></i> Other Structures: {singleListingData?.property_details?.exterior?.features?.Other_Structures}
                </li>
              )}
              {singleListingData?.property_details?.parking?.number_of_spaces ? (
                <li>
                  <i className='fas fa-car'></i> Parking: {singleListingData?.property_details?.parking?.number_of_spaces} spaces
                </li>
              ): ""}
              {singleListingData?.property_highlights?.total_acres && (
                <li>
                  <i className='fas fa-tree'></i> Total Acres: {singleListingData?.property_highlights?.total_acres}
                </li>
              )}
              {singleListingData?.property_highlights?.deed_restrictions && (
                <li>
                  <i className='fas fa-file-contract'></i> Deed Restrictions: {singleListingData?.property_highlights?.deed_restrictions}
                </li>
              )}
                {singleListingData?.property_details?.exterior?.features?.Fencing && (
                <li>
                  <i className='fas fa-bars'></i> Fencing: {singleListingData?.property_details?.exterior?.features?.Fencing}
                </li>
              )}
              {singleListingData?.property_details?.exterior?.features?.Exterior_Features && (
                <li>
                  <i className='fas fa-tree'></i> Exterior Features: {singleListingData?.property_details?.exterior?.features?.Exterior_Features}
                </li>
              )}
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FeatureDeskBox;
