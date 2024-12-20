/**
 * It takes in a list of properties and returns a list of property boxes
 * @returns A div with a className of property-2 row column-sm zoom-gallery property-label
 * property-grid.
 */
import React, { Fragment } from "react";
import { Col, Row } from "reactstrap";
import OfferingBox from "@/components/elements/propertyBoxs/OfferingBox";
import { LoadingScreen4 } from "@/layout/loader/LoadingScreen";
import { useTranslation } from "react-i18next";

const GridLayout = ({
  grid,
  listSize,
  relativeSlider,
  video,
  toPage,
  subscribedOfferings,
  unsubscribedOfferings,
  loading
}) => {
  const { t } = useTranslation("common");

  if (loading) {
    return <LoadingScreen4 />
  }
  return (
    <Fragment>
      {subscribedOfferings && subscribedOfferings.length ? (
        <>
          <h3
            style={{ fontWeight: "bold", marginBottom: "1em", color: "#333" }}
          >
            {t("SUBSCRIBED_OFFERS")}
          </h3>
          <Row
            className={`property-2 column-sm zoom-gallery property-label property-grid ${
              grid.gridStyle === "list-view" ? "list-view" : ""
            }`}
          >
            {subscribedOfferings && subscribedOfferings.length ? (
              subscribedOfferings.map((data, i) => (
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
                    <OfferingBox
                      data={data}
                      relativeSlider={relativeSlider}
                      video={video}
                      toPage={toPage}
                      setToPage
                    />
                  </Col>
                </Fragment>
              ))
            ) : (
              <p>{t("NO_SUBSCRIBED_OFFERS")}</p>
            )}
          </Row>
          <hr style={{ border: "1px solid #959595d6", margin: "3.5em 0" }} />
        </>
      ) : (
        ""
      )}

      {unsubscribedOfferings && unsubscribedOfferings.length ? (
        <>
          <h3
            style={{ fontWeight: "bold", marginBottom: "1em", color: "#333" }}
          >
            {t("OFFERINGS")}
          </h3>
          <Row
            className={`property-2 column-sm zoom-gallery property-label property-grid ${
              grid.gridStyle === "list-view" ? "list-view" : ""
            }`}
          >
            {unsubscribedOfferings && unsubscribedOfferings.length ? (
              unsubscribedOfferings.map((data, i) => (
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
                    <OfferingBox
                      data={data}
                      relativeSlider={relativeSlider}
                      video={video}
                      toPage={toPage}
                      setToPage
                    />
                  </Col>
                </Fragment>
              ))
            ) : (
              <p>{t("NO_OFFERINGS_AVAILABLE")}</p>
            )}
          </Row>
        </>
      ) : (
        ""
      )}

      {subscribedOfferings &&
      subscribedOfferings.length == 0 &&
      unsubscribedOfferings &&
      unsubscribedOfferings.length == 0 ? (
        <p>{t("NO_OFFERINGS_AVAILABLE")}</p>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default GridLayout;
