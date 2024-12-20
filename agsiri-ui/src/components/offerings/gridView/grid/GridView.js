import { useEffect, useReducer, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import Header from "../../../../layout/sidebarLayout/Header";
import GridLayout from "../../elements/GridLayout";
import { getAPIData } from "../../../../utils/getData";
import { gridReducer, initialGrid } from "./gridReducer";
import { BASE_URL } from "@/config/apiBaseUrls";
import { useTranslation } from "react-i18next";
import Pagination from "../../../../layout/Pagination";

const GridView = ({
  size,
  gridType,
  listSize,
  relativeSlider,
  gridBar,
  video,
  tabHeader,
  children,
  infiniteScroll,
  myList,
}) => {
  const { t } = useTranslation("common");

  const [grid, gridDispatch] = useReducer(gridReducer, initialGrid);
  const [toPage, setToPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const [productCount, setProductCount] = useState();
  const [searchItem, setSearchItem] = useState("");
  const [listingCardData, setListingCardData] = useState([]);
  const [offeringsCardData, setOfferingsCardData] = useState([]);
  const [subscribedOfferings, setSubscribedOfferings] = useState([]);
  const [unsubscribedOfferings, setUnsubscribedOfferings] = useState([]);
  const [loading, setLoading] = useState(false);
  const headerRef = useRef(null);
  let sortBy = "";
  // Get the current sorting option from Redux
  const { sortBy: sortByValue } = useSelector((state) => state.inputsReducer);

  // API call to fetch listing data with pagination and sorting
  useEffect(() => {
    // Dispatch grid configuration settings (initial setup)
    gridDispatch({ type: "gridSize", payload: size });
    gridDispatch({ type: "gridStyle", payload: gridType });
  }, []);

  const handlePageChange = async (newPage) => {
    setToPage(newPage);
  };
  const handleSearch = (value) => {
    setSearchItem(value);
    setToPage(1);
  };

  useEffect(() => {
    getAllOfferings();
  }, []);

  const getAllOfferings = async () => {
    setLoading(true);
    try {
      const response = await getAPIData(`${BASE_URL.OFFERING}/offerings`);

      if (response?.length > 0) {
        const filteredOfferings = response.filter(
          (offering) => offering.status === "ACTIVE"
        );

        const offeringDetailsArray = await Promise.all(
          filteredOfferings.map(async (offering) => {
            const listingResponse = await getListingDetailsForOffering(
              offering.listing_id
            );
            return {
              offeringsCardData: offering,
              listingDetails: listingResponse,
            };
          })
        );
        setToPage(1);
        setTotalPages(Math.ceil(offeringDetailsArray.length / 6));
        setProductCount(offeringDetailsArray.length);
        const subscribedOfferings = offeringDetailsArray.filter(
          (item) => item.offeringsCardData.is_user_subscribed
        );

        const unsubscribedOfferings = offeringDetailsArray.filter(
          (item) => !item.offeringsCardData.is_user_subscribed
        );
        setOfferingsCardData(offeringDetailsArray);
        setUnsubscribedOfferings(unsubscribedOfferings);
        setSubscribedOfferings(subscribedOfferings);
      }
    } catch (error) {
      console.error("Error fetching offerings:", error);
    } finally {
      setLoading(false);
    }
  };

  const getListingDetailsForOffering = async (listingId) => {
    const response = await getAPIData(
      `${BASE_URL.LISTING}/listings/${listingId}`
    );
    return response;
  };
  return (
    <section
      className={`property-section  ${
        relativeSlider ? "property-list-thumbnail" : ""
      }`}
    >
      <Container>
        <Row className="ratio_63" style={{ marginTop: "5em" }}>
          <Col xl="12" lg="12" className="property-grid-slider">
            <Header
              headerRef={headerRef}
              grid={grid}
              toPage={toPage}
              productCount={productCount}
              gridDispatch={gridDispatch}
              title={t("OFFERS_LISTING")}
              gridBar={gridBar}
              tabHeader={tabHeader}
              handleSearch={handleSearch}
              searchItem={searchItem}
              screenName={"offerings"}
              pagination={false}
            />

            <div
              className={`property-wrapper-grid ${
                grid.gridStyle ? "list-view" : ""
              }`}
            >
              <GridLayout
                grid={grid}
                myList={myList}
                listSize={listSize}
                relativeSlider={relativeSlider}
                video={video}
                gridDispatch={gridDispatch}
                infiniteScroll={infiniteScroll}
                listingCardData={listingCardData}
                toPage={toPage}
                offeringsCardData={offeringsCardData}
                subscribedOfferings={subscribedOfferings}
                unsubscribedOfferings={unsubscribedOfferings}
                loading={loading}
              />
            </div>
            {/* Pagination is COMENTING FOR NOW AS THIS SHOW OFFERINGS IN BLOCKS UI LAST DAY CHANGE*/}
            {/* <Pagination
              headerRef={headerRef}
              toPage={toPage}
              setToPage={setToPage}
              totalPages={totalPages}
              setTotalPages={setTotalPages}
              productCount={productCount}
              setProductCount={setProductCount}
              handlePageChange={handlePageChange}
            /> */}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default GridView;
