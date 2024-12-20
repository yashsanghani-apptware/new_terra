import { PROFILE_TABS } from "@/constValues/constValues";
import React, { useState, useEffect } from "react";
import { Col, Nav, NavItem, NavLink } from "reactstrap";

const ProfilePanelSidebar = ({ activeTab, setActiveTab, userDetails }) => {
  

  if (!userDetails) {
    return null; // Show nothing if userDetails is not yet loaded
  }

  return (
    <Col lg="3">
      <div className="sidebar-user sticky-cls">
        <div className="user-profile">
          <div className="media">
            <div className="media-body">
              <div style={{ display: "flex", alignItems: "center" }}>
                <h5>{`${userDetails?.firstName || ""} ${userDetails.familyName}`}</h5>
              </div>
              <h6 className="font-roboto">
                {userDetails.address?.streetAddress},{" "}
                {userDetails.address?.addressLocality},{" "}
                {userDetails.address?.addressRegion},{" "}
                {userDetails.address?.postalCode},{" "}
                {userDetails.address?.addressCountry}
              </h6>
            </div>
          </div>
        </div>
        <div className="dashboard-list">
          <Nav tabs className="right-line-tab">
            {PROFILE_TABS.map((tab) => (
              <NavItem key={tab.id}>
                <NavLink
                  className={activeTab === tab.id ? "active" : ""}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </div>
      </div>
    </Col>
  );
};

export default ProfilePanelSidebar;
