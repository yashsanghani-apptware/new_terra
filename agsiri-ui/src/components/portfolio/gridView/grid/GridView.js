import { useEffect, useReducer, useState, useRef } from "react";
import { Col, Container, Row } from "reactstrap";
import Pagination from "../../../../layout/Pagination";
import Header from "../../../../layout/sidebarLayout/Header";
import GridLayout from "../../elements/GridLayout";
import { getAPIData } from "../../../../utils/getData";
import { gridReducer, initialGrid } from "./gridReducer";
import { BASE_URL } from "@/config/apiBaseUrls";

const GridView = ({
  size,
  gridType,
  listSize,
  relativeSlider,
  gridBar,
  video,
  tabHeader,
}) => {
  const [grid, gridDispatch] = useReducer(gridReducer, initialGrid);
  const [toPage, setToPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const [productCount, setProductCount] = useState();
  const [searchItem, setSearchItem] = useState("");
  const [portfolioData, setPortfolioData] = useState({});
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [loading, setLoading] = useState(false);
  const headerRef = useRef(null);
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
    getPortfolio();
  }, []);

  const getPortfolio = async () => {
    setLoading(true);
    try {
      const res = await getAPIData(
        `${BASE_URL.PORTFOLIO}/user/${userDetails._id}`
      );
      let portfolioDetails = [];

      if (res) {
        // Use Promise.all to wait for all async operations to complete
        portfolioDetails = await Promise.all(
          res.investments.map(async (item) => {
            const offer = await getAPIData(
              `${BASE_URL.OFFERING}/offerings/${item.offering_id}`
            );

            const listing = await getAPIData(
              `${BASE_URL.LISTING}/listings/${offer.Offering.listing_id}`
            );

            return {
              offering: offer.Offering,
              listingDetails: listing,
              portfolio: item,
            };
          })
        );
      }

      setPortfolioData(portfolioDetails);
      setToPage(1);
      setTotalPages(Math.ceil(portfolioDetails.length / 6));
      setProductCount(portfolioDetails.length);
    } catch (error) {
      console.error("Error fetching portfolio details:", error);
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
              title="Investments"
              gridBar={gridBar}
              tabHeader={tabHeader}
              handleSearch={handleSearch}
              searchItem={searchItem}
              screenName={"Investments"}
            />

            <div
              className={`property-wrapper-grid ${
                grid.gridStyle ? "list-view" : ""
              }`}
            >
              <GridLayout
                grid={grid}
                listSize={listSize}
                relativeSlider={relativeSlider}
                video={video}
                toPage={toPage}
                portfolioData={portfolioData}
                loading={loading}
              />
            </div>
            <Pagination
              headerRef={headerRef}
              toPage={toPage}
              setToPage={setToPage}
              totalPages={totalPages}
              setTotalPages={setTotalPages}
              productCount={productCount}
              setProductCount={setProductCount}
              handlePageChange={handlePageChange}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default GridView;
