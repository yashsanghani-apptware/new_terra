import React, { useState } from "react";
import { Col, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";

const OfferingSidebars = ({ activeTab, setActiveTab, data }) => {

  return (
    <Col lg='3'>
      <div className='sidebar-user sticky-cls'>
        <div className='user-profile'>
          <div className='media'>
            <div className='change-pic'>
            </div>
            <div className='media-body'>
              <h5>{data?.address?.house_number ? data?.address?.house_number : ""} {data?.name || "Orchard House"}</h5>
              <h6 className='font-roboto'>{data?.address?.house_number}  {data?.address?.street} {data?.address?.apartment} {data?.address?.city} {data?.address?.state} {data?.address?.zip}</h6>
              {/* <h6 className='font-roboto mb-0'>$189,000.00</h6> */}
              <span className="label label-shadow ms-2">{data?.status}</span>
            </div>
          </div>
        </div>
        <div className='dashboard-list'>
          <Nav tabs className='right-line-tab'>
            <NavItem>
              <NavLink className={activeTab === "Investment Highlights" ? "active" : ""} onClick={() => setActiveTab("Investment Highlights")}>
                Investment Highlights
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={activeTab === "Overview" ? "active" : ""} onClick={() => setActiveTab("Overview")}>
                Overview
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={activeTab === "Property Details" ? "active" : ""} onClick={() => setActiveTab("Property Details")}>
                Property Details
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={activeTab === "Finincials" ? "active" : ""} onClick={() => setActiveTab("Finincials")}>
                Finincials
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={activeTab === "Documents" ? "active" : ""} onClick={() => setActiveTab("Documents")}>
                Documents
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={activeTab === "Review and Submit" ? "active" : ""} onClick={() => setActiveTab("Review and Submit")} style={{textTransform: "unset"}}>
                Review and Submit
              </NavLink>
            </NavItem>
          </Nav>

        </div>
      </div>
    </Col>
  );
};

const OfferingSidebar = ({ onTabClick, data, offeringData }) => {
  const [activeTab, setActiveTab] = useState("Property Details");

  const toggleTab = (tabId) => {
    setActiveTab(tabId);
    onTabClick(tabId); // Scroll to the corresponding section
  };

  return (
    <Col lg="3">
      <div className='sidebar-user sticky-cls'>

        <div className='user-profile'>
          <div className='media'>
            <div className='change-pic'>
            </div>
            <div className='media-body'>
              <h5>{offeringData?.name}</h5>
              <h6 className='font-roboto'>{data?.address?.house_number}  {data?.address?.street} {data?.address?.apartment} {data?.address?.city} {data?.address?.state} {data?.address?.zip}</h6>
              <span className="label label-shadow">{offeringData?.status}</span>
            </div>
          </div>
        </div>

        <div className='dashboard-list'>
          <Nav tabs className='right-line-tab'>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "Property Details" })}
                onClick={() => toggleTab("Property Details")}
              >
                Property Details
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "Overview" })}
                onClick={() => toggleTab("Overview")}
              >
                Overview
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "Investment Highlights" })}
                onClick={() => toggleTab("Investment Highlights")}
              >
                Investment Highlights
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "Financials" })}
                onClick={() => toggleTab("Financials")}
              >
                Financials
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "Documents" })}
                onClick={() => toggleTab("Documents")}
              >
                Documents
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </div>
    </Col>
  );
};

export default OfferingSidebar;
