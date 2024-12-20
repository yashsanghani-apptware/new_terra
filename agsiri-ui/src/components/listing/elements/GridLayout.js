/**
 * It takes in a list of properties and returns a list of property boxes
 * @returns A div with a className of property-2 row column-sm zoom-gallery property-label
 * property-grid.
 */
import React, { Fragment, useEffect } from "react";
import { Col, Row } from "reactstrap";
import useFilterProducts from "../../../utils/useFilterProducts";
import PropertyBox from "../../elements/propertyBoxs/PropertyBox";
import { LoadingScreen4 } from "@/layout/loader/LoadingScreen";

const GridLayout = ({
  value,
  grid,
  listSize,
  relativeSlider,
  video,
  infiniteScroll,
  myList,
  gridDispatch,
  listingCardData,
  toPage,
  loading,
}) => {
  let cardToShow = 6;
  const showProduct = useFilterProducts({ value, myList });

  useEffect(() => {
    // gridDispatch({ type: "totalPages", payload: Math.ceil(listingCardData?.length / cardToShow) });
    // gridDispatch({ type: "productCount", payload: listingCardData?.length });
  }, [listingCardData, cardToShow]);

  if (loading) {
    return <LoadingScreen4 />;
  }
  return (
    <Fragment>
      <Row
        className={`property-2 column-sm zoom-gallery property-label property-grid ${
          grid.gridStyle === "list-view" ? "list-view" : ""
        }`}
      >
        {
          // showProduct &&
          //   showProduct.slice(!infiniteScroll && cardToShow * grid.toPage - cardToShow, cardToShow * grid.toPage).map((data, i) => (
          // listingCardData && listingCardData.slice(!infiniteScroll && cardToShow * grid.toPage - cardToShow, cardToShow * grid.toPage).map((data, i) => (
          listingCardData && listingCardData.length
            ? listingCardData.map((data, i) => (
                <Fragment key={i}>
                  <Col
                    sm={
                      grid.gridStyle === "grid-view" &&
                      (grid.gridSize === 3 || 4) &&
                      "6"
                    }
                    md={grid.gridStyle === "list-view" && "12"}
                    lg={
                      grid.gridStyle === "grid-view" &&
                      ((grid.gridSize === 2 && "6") ||
                        ((grid.gridSize === 3 || 4) && "4"))
                    }
                    xl={grid.gridStyle === "list-view" && listSize === 2 && "6"}
                    xxl={
                      grid.gridStyle === "grid-view" &&
                      grid.gridSize === 4 &&
                      "3"
                    }
                    className={`${
                      grid.gridStyle === "list-view" ? "list-view" : ""
                    } wow fadeInUp grid-view `}
                    key={i}
                  >
                    <PropertyBox
                      data={data}
                      relativeSlider={relativeSlider}
                      video={video}
                      toPage={toPage}
                      setToPage
                    />
                  </Col>
                </Fragment>
              ))
            : ""
        }
      </Row>
    </Fragment>
  );
};

export default GridLayout;
