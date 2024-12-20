import React, { useState, useEffect, Fragment } from "react";
import { Facebook, Instagram, Printer, Twitter } from "react-feather";
import { Container } from "reactstrap";
import ReviewStarr from "../../elements/ReviewStarr";
import { useSelector } from "react-redux";
import CurrencyFormatter from "@/utils/currencyFormatter";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const TopTitle = ({
  singleData,
  id,
  singleListingData,
  currentPage,
  offerDetails,
  fromOfferScreen,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [like, setLike] = useState(false);
  const [path, setPath] = useState();
  useEffect(() => {
    setPath(pathname.split("/"));
  }, [router.pathname]);
  const { symbol, currencyValue } = useSelector(
    (state) => state.currencyReducer
  );
  return (
    <div className="single-property-section">
      <Container>
        <div className="single-title">
          <div className="left-single">
            {!fromOfferScreen && (
              <div>
                <nav aria-label="breadcrumb" className="theme-breadcrumb">
                  <ol
                    className="breadcrumb"
                    style={{ paddingBottom: 20, paddingTop: 0 }}
                  >
                    {path?.map((data, i) => (
                      <Fragment key={i}>
                        {data && (
                          <Link
                            href={
                              path.length !== i + 1
                                ? {
                                  pathname: `/${data}`,
                                  query: { toPage: currentPage },
                                }
                                : {}
                            }
                            aria-disabled
                            className="breadcrumb-item"
                          >
                            <span>{data.replaceAll("-", " ")}</span>
                          </Link>
                        )}
                      </Fragment>
                    ))}
                  </ol>
                </nav>
              </div>
            )}

            <div className="d-flex">
              <h2 className="mb-0">
                {singleListingData?.address?.house_number
                  ? singleListingData?.address?.house_number
                  : ""}{" "}
                {singleListingData?.name || "Orchard House"}
              </h2>
              <span>
                <span className="label label-shadow ms-2">
                  {singleListingData?.status}
                </span>
              </span>
            </div>

            <p className="mt-1">
              {" "}
              {singleListingData?.address?.house_number}{" "}
              {singleListingData?.address?.street}{" "}
              {singleListingData?.address?.apartment}{" "}
              {singleListingData?.address?.city}{" "}
              {singleListingData?.address?.state}{" "}
              {singleListingData?.address?.zip}
            </p>
            <ul>
              <li>
                <div>
                  <img
                    src="/assets/images/svg/icon/unlisted.svg"
                    className="img-fluid ruler-tool"
                    alt=""
                  />
                  <span>
                    {singleListingData?.property_highlights?.total_acres || "—"}{" "}
                    Total Acres
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <img
                    src="/assets/images/svg/icon/square-ruler-tool.svg"
                    className="img-fluid ruler-tool"
                    alt=""
                  />
                  <span>
                    {singleListingData?.public_facts?.["Total_Sq_Ft_"] || "—"}{" "}
                    Sq ft
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <img
                    src="/assets/images/svg/icon/double-bed.svg"
                    className="img-fluid"
                    alt=""
                  />
                  <span>
                    {singleListingData?.public_facts?.["Beds"] || "-"} Bedrooms
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <img
                    src="/assets/images/svg/icon/bathroom.svg"
                    className="img-fluid"
                    alt=""
                  />
                  <span>
                    {singleListingData?.public_facts?.["Baths"] || "-"}{" "}
                    Bathrooms
                  </span>
                </div>
              </li>
              {singleData?.halls && (
                <li>
                  <div>
                    <img
                      src="/assets/images/svg/icon/sofa.svg"
                      className="img-fluid"
                      alt=""
                    />
                    <span>{singleData?.halls || "-"} Halls</span>
                  </div>
                </li>
              )}
              <li>
              </li>
            </ul>
          </div>
          {singleListingData?.property_details?.financial?.price?.price && (
            <>
              <div className="right-single">
                <ReviewStarr rating={4} />
                <h2 className="price">
                  <CurrencyFormatter
                    value={Number(
                      singleListingData?.property_details?.financial?.price
                        ?.price
                    )}
                    locale="en-US"
                    currency={
                      singleListingData?.property_details?.financial?.price
                        ?.currency ?? "USD"
                    }
                  />
                </h2>
                {!fromOfferScreen && (
                  <Link
                    href={{
                      pathname: `/offering/details`,
                      query: {
                        data: JSON.stringify(singleListingData),
                        offerDetails: offerDetails?.Offering ? JSON.stringify({ offering_id: offerDetails?.Offering.offering_id }) : JSON.stringify(offerDetails),
                      },
                    }}
                  >
                    <span className="btn btn-gradient btn-pill">
                      {offerDetails?.Offering ? (offerDetails?.Offering?.status === "ACTIVE" ? "Update Offer" : "Draft Offer") : "Convert to offer"}
                    </span>
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default TopTitle;
