/**
 * It takes in a list of properties and returns a list of property boxes
 * @returns A div with a className of property-2 row column-sm zoom-gallery property-label
 * property-grid.
 */
import React, { Fragment } from "react";
import { Col, Row } from "reactstrap";
import PortfolioBox from "@/components/elements/propertyBoxs/PortfolioBox";
import { LoadingScreen4 } from "@/layout/loader/LoadingScreen";

const GridLayout = ({
  grid,
  listSize,
  relativeSlider,
  video,
  toPage,
  portfolioData,
  loading
}) => {
  if (loading) {
    return <LoadingScreen4 />
  }
  return (
    <Fragment>
      <Row
        className={`property-2 column-sm zoom-gallery property-label property-grid ${
          grid.gridStyle === "list-view" ? "list-view" : ""
        }`}
      >
        {portfolioData && portfolioData.length
          ? portfolioData.slice(6 * toPage - 6, 6 * toPage).map((data, i) => (
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
                    grid.gridStyle === "grid-view" && grid.gridSize === 4 && "3"
                  }
                  className={`${
                    grid.gridStyle === "list-view" ? "list-view" : ""
                  } wow fadeInUp grid-view `}
                  key={i}
                >
                  <PortfolioBox
                    data={data}
                    relativeSlider={relativeSlider}
                    video={video}
                    toPage={toPage}
                  />
                </Col>
              </Fragment>
            ))
          : ""}
      </Row>
    </Fragment>
  );
};

export default GridLayout;
