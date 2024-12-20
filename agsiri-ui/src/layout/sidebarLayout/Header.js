import React, { useState } from "react";
import { Grid, List } from "react-feather";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { sortBy } from "@/redux-toolkit/reducers/inputsReducer"; // Action to update sort in Redux
import { useTranslation } from "react-i18next";

const Header = ({
  toPage,
  grid,
  mapView,
  mapModal,
  gridBar,
  tabHeader,
  title,
  productCount,
  gridDispatch,
  headerRef,
  handleSearch,
  searchItem,
  screenName,
  pagination = true
}) => {
  const { t } = useTranslation("common");

  // const headerRef = useRef(null); // Create a ref for the header
  const [isOpen, setIsOpen] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const { sortBy: sortByValue, propertyStatus } = useSelector(
    (state) => state.inputsReducer
  );
  const dispatch = useDispatch();

  // Handle sorting dropdown
  const handleSortBy = (sortOption) => {
    dispatch(sortBy(sortOption)); // Dispatch the sortBy action with the selected sort option
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div className="filter-panel" ref={headerRef}>
      {" "}
      {/* Attach the ref to this div */}
      <div className="top-panel">
        {tabHeader ? (
          <div className="filters respon-filter-content filter-button-group">
            <ul>
              <li
                className={propertyStatus === "All Property" ? "active" : ""}
                onClick={() =>
                  dispatch({ type: "propertyStatus", payload: "All Property" })
                }
              >
                <span>{t("ALL_PROPERTY")}</span>
              </li>
              <li
                className={propertyStatus === "For Sale" ? "active" : ""}
                onClick={() =>
                  dispatch({ type: "propertyStatus", payload: "For Sale" })
                }
              >
                <span>{t("FOR_SALE")}</span>
              </li>
              <li
                className={propertyStatus === "For Rent" ? "active" : ""}
                onClick={() =>
                  dispatch({ type: "propertyStatus", payload: "For Rent" })
                }
              >
                <span>{t("FOR_RENT")}</span>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <h2>{title}</h2>
            {productCount && <span className="show-result">
              {t("SHOWING")}{" "}
              {
                pagination ? 
                  <span>
                    {(toPage || 1) * 6 - 5}-
                    {Math.min(productCount, (toPage || 1) * 6)} of {productCount}
                  </span>
                :
                  <span>
                    {(toPage || 1)}-{productCount} of {productCount}
                  </span>
              }
              {" "}
              {screenName || t("LISTINGS")}
            </span>}
          </div>
        )}

        <ul className="grid-list-filter d-flex">
          {mapModal && (
            <li>
              <a onClick={() => setMapModalOpen(!mapModalOpen)}>View on map</a>
            </li>
          )}

          {!screenName && (
            <>
              <div className="listing-sidebar">
                <Input
                  type="text"
                  className="search-listing"
                  placeholder="Search name, city, state, desc..."
                  value={searchItem}
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{ marginRight: 10, padding: 8 }}
                />
              </div>
              <li style={{ marginLeft: 15 }}>
                <Dropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
                  <DropdownToggle className="font-rubik">
                    <span>{sortByValue || t("SORT_BY_NEWEST")}</span>{" "}
                    <i className="fas fa-angle-down ms-lg-3 ms-2"></i>
                  </DropdownToggle>
                  <DropdownMenu className="text-start">
                    <DropdownItem onClick={() => handleSortBy("newest")}>
                      {t("SORT_BY_NEWEST")}
                    </DropdownItem>
                    <DropdownItem onClick={() => handleSortBy("oldest")}>
                      {t("SORT_BY_OLDEST")}
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleSortBy("priceHighToLow")}
                    >
                      {t("HIGH_TO_LOW_PRICE")}
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleSortBy("priceLowToHigh")}
                    >
                      {t("LOW_TO_HIGH_PRICE")}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </li>
            </>
          )}

          {gridBar && (
            <>
              <li
                className={`grid-btn ${
                  grid?.gridStyle === "grid-view" && "active"
                }`}
              >
                <a
                  onClick={() =>
                    gridDispatch({ type: "gridStyle", payload: "grid-view" })
                  }
                >
                  <Grid />
                </a>
              </li>
              <li
                className={`list-btn ${
                  grid?.gridStyle === "list-view" && "active"
                }`}
              >
                <a
                  onClick={() =>
                    gridDispatch({ type: "gridStyle", payload: "list-view" })
                  }
                >
                  <List />
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
