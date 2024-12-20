import { useEffect, useReducer, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import Pagination from "../../../../layout/Pagination";
import Header from "../../../../layout/sidebarLayout/Header";
import GridLayout from "../../elements/GridLayout";
import { getListingCardsData } from "../../../../utils/getData";
import { gridReducer, initialGrid } from "./gridReducer";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageFromUrl = searchParams?.get('toPage') || 1;
  const [toPage, setToPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const [productCount, setProductCount] = useState();
  const [searchItem, setSearchItem] = useState("");
  const [listingCardData, setListingCardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const headerRef = useRef(null);
  let sortBy = "";
  // Get the current sorting option from Redux
  const { sortBy: sortByValue } = useSelector((state) => state.inputsReducer);

  // API call to fetch listing data with pagination and sorting
  const fetchData = async (newPage = toPage, search = searchItem) => {
    setLoading(true);
    try {
      const res = await getListingCardsData(
        `/listings?page=${newPage}&pageSize=6&sortBy=${sortByValue || "newest"}&search=${search}`
      );
      setListingCardData(res?.data);

      // Update pagination state
      const { totalPages, currentPage, totalItems } = res.meta;
      setToPage(currentPage);
      setTotalPages(totalPages);
      setProductCount(totalItems);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Dispatch grid configuration settings (initial setup)
    gridDispatch({ type: "gridSize", payload: size });
    gridDispatch({ type: "gridStyle", payload: gridType });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/auth/login");
    } else {
      if(sortBy != sortByValue ){
        sortBy = sortByValue
        fetchData(pageFromUrl);
      }
    }
  }, [sortByValue]); // Re-run on page change or sort change

  const handlePageChange = async (newPage) => {
    setToPage(newPage);
    fetchData(newPage);
    router.push(`/listings?toPage=${newPage}`);
  };
  const handleSearch = (value) => {
    setSearchItem(value);
    setToPage(1);
    fetchData(1, value)
  }
  return (
    <section
      className={`property-section  ${
        relativeSlider ? "property-list-thumbnail" : ""
      }`}
    >
      {
        localStorage.getItem("token") &&       
      <Container>
        <Row className="ratio_63" style={{ marginTop: "5em" }}>
          <Col xl="12" lg="12" className="property-grid-slider">
            <Header
              headerRef={headerRef}
              grid={grid}
              toPage={toPage}
              productCount={productCount}
              gridDispatch={gridDispatch}
              title={t("PROPERTIES_LISTINGS")}
              gridBar={gridBar}
              tabHeader={tabHeader}
              handleSearch={handleSearch}
              searchItem={searchItem}
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
      }
    </section>
  );
};

export default GridView;
