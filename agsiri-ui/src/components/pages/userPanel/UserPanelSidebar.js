import { CREATE_OFFER_STEPS } from "@/constValues/constValues";
import React, { useState } from "react";
import { Camera, Edit } from "react-feather"; // import the Edit icon from react-feather
import { Col, Nav, NavItem, NavLink } from "reactstrap";

const UserPanelSidebar = ({
  activeTab,
  setActiveTab,
  data,
  handleOfferName,
  offeringName,
  setOfferingName,
  offeringStatus,
  offeringSubmitted
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    setOfferingName(e.target.value);
  };

  const handleSave = () => {
    setIsEditing(false);
    handleOfferName(offeringName);
  };

  return (
    <Col lg="3">
      <div className="sidebar-user sticky-cls">
        <div className="user-profile">
          <div className="media">
            <div className="change-pic">
            </div>
            <div className="media-body">
              <div style={{ display: "flex", alignItems: "center" }}>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={offeringName}
                      onChange={handleNameChange}
                      onBlur={handleSave} // Save when input loses focus
                      autoFocus
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        border: "none",
                        outline: "none",
                        backgroundColor: "transparent",
                      }}
                    />
                  </>
                ) : (
                  <h5>
                    {offeringName}
                    {<Edit
                      size={16}
                      style={{ marginLeft: 8, cursor: "pointer" }}
                      onClick={handleEditClick}
                    />}
                  </h5>
                )}
              </div>
              <h6 className="font-roboto">
                {data?.address?.house_number} {data?.address?.street}{" "}
                {data?.address?.apartment} {data?.address?.city}{" "}
                {data?.address?.state} {data?.address?.zip}
              </h6>
              <span className="label label-shadow">{offeringSubmitted ? "ACTIVE" : offeringStatus}</span>
            </div>
          </div>
        </div>
        <div className="dashboard-list">
          <Nav tabs className="right-line-tab">
            {
              CREATE_OFFER_STEPS.map((step, index) => (
                <NavItem key={index}>
                  <NavLink
                    className={activeTab === step ? "active" : ""}
                    onClick={() => setActiveTab(step)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75em",
                      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                    }}
                  >
                    {index + 1}
                  </div>
                    {step}
                  </NavLink>
                </NavItem>
              ))
            }
          </Nav>
        </div>
      </div>
    </Col>
  );
};

export default UserPanelSidebar;
