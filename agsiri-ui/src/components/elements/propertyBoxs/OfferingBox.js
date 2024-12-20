/**
 * It returns a div with a class of property-box, which contains a div with a class of property-image,
 * which contains an ImageSlider component, which contains an array of images, which are passed in as a
 * prop
 * @returns A React component.
 */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Camera } from "react-feather";
import ContentLoader from "react-content-loader";
import ImageSlider from "../ImageSlider";
import PropertyLabel from "../PropertyLabel";
import { getListingMedia } from "@/utils/getData";
import CurrencyFormatter from "@/utils/currencyFormatter";
import { Chip } from "@mui/material";

const OfferingBox = ({ data, relativeSlider, video, toPage }) => {
  const [load, setLoad] = useState(true);
  const [images, setImages] = useState();
  const [imagesMeta, setImagesMeta] = useState();
  const [videos, setVideos] = useState();

  useEffect(() => {
    getListingMedia(
      `/listings/image/${data?.listingDetails?.listing_id}?limit=1`
    ).then((res) => {
      setImages(res.data.images);
      setImagesMeta(res.data.imagesMeta);
      setVideos(res.data.videos);
    });
  }, [data?.listingDetails?.listing_id]);

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0"); // Get the day and pad with 0 if needed
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (0-based, so add 1)
    const year = date.getFullYear(); // Get the full year

    return `${day}/${month}/${year}`;
  }
  return (
    <>
      {!load ? (
        <div className="property-box">
          <div className="property-image">
            {images && images.length > 0 ? (
              <ImageSlider images={images.slice(0, 1)} />
            ) : (
              <img
                src="/assets/images/parallax/3.jpg"
                className="bg-img img-fluid"
                alt=""
              />
            )}
            <div className="labels-left">
              <PropertyLabel labels={data?.offeringsCardData?.name} />
            </div>
            {!relativeSlider ? (
              <>
                {images ? (
                  <>
                    <div className="seen-data">
                      <Camera /> <span>{imagesMeta.totalItems}</span>
                    </div>{" "}
                  </>
                ) : (
                  ""
                )}
                {data?.offeringsCardData?.status ? (
                  <>
                    <div className="seen-data-left label label-shadow ms-2">
                      <span>{data?.offeringsCardData?.status}</span>
                    </div>{" "}
                  </>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </div>

          <div className="property-details">
            <span className="font-roboto" style={data?.offeringsCardData?.is_user_subscribed ? { display: "flex", justifyContent: "space-between" } : {}}>
              {data?.listingDetails?.address?.city || "USA"}{" "}
              { 
                data?.offeringsCardData?.is_user_subscribed &&
                  <Chip
                    label="Already Subscribed"
                    color="success"
                    variant="outlined"
                    sx={{ fontWeight: "bold" }}
                    style={{ letterSpacing: 0 }}
                  />
              }
            </span>
            <Link
              href={{
                pathname: "/offering/views",
                query: {
                  data: JSON.stringify(data?.listingDetails),
                  offerDetails: JSON.stringify({
                    offering_id: data?.offeringsCardData?.offering_id,
                    is_user_subscribed: data?.offeringsCardData?.is_user_subscribed
                  }),
                },
              }}
            >
              <h3>{data?.offeringsCardData?.name}</h3>
            </Link>
            {data?.offeringsCardData?.financial_details?.total_cost_of_farm
              ?.cost_of_farmland && (
              <>
                <h6>
                  <CurrencyFormatter
                    value={Number(
                      data?.offeringsCardData?.financial_details
                        ?.total_cost_of_farm?.cost_of_farmland
                    )}
                    locale="en-US"
                    currency={
                      data?.offeringsCardData?.financial_details
                        ?.total_cost_of_farm?.cost_of_farmland ?? "USD"
                    }
                  />
                </h6>
              </>
            )}
            <p className="font-roboto">
              {data?.listingDetails?.property_description ||
                "This home provides wonderful entertaining spaces with a chef kitchen opening. Elegant retreat in a quiet Coral Gables setting.."}{" "}
            </p>
            <ul>
              <li>
                <img
                  src="/assets/images/svg/icon/unlisted.svg"
                  className="img-fluid"
                  alt=""
                />
                Total Acres :{" "}
                {data?.offeringsCardData?.details?.total_acres || "-"}
              </li>

              <li>
                <img
                  src="/assets/images/svg/icon/double-bed.svg"
                  className="img-fluid"
                  alt=""
                />
                Hold : {data?.offeringsCardData?.details?.target_hold || "-"}
              </li>
              <li>
                <img
                  src="/assets/images/svg/icon/bathroom.svg"
                  className="img-fluid"
                  alt=""
                />
                Offering :{" "}
                {data?.offeringsCardData?.details?.offering_size || "-"}
              </li>
            </ul>
            <div className="property-btn d-flex">
              <span>{formatDate(data?.listingDetails?.built_on)}</span>
              <Link
                href={{
                  pathname: "/offering/views",
                  query: {
                    data: JSON.stringify(data?.listingDetails),
                    offerDetails: JSON.stringify({
                      offering_id: data?.offeringsCardData?.offering_id,
                      is_user_subscribed: data?.offeringsCardData?.is_user_subscribed
                    }),
                  },
                }}
              >
                <button type="button" className="btn btn-dashed btn-pill">
                  Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <ContentLoader className="skeleton-svg">
            {setTimeout(() => {
              setLoad(false);
            }, 1000)}
            <rect className="skeleton-img" />
            <rect className="skeleton-c1" />
            <rect className="skeleton-c2" />
            <rect className="skeleton-c3" />
          </ContentLoader>
        </>
      )}
    </>
  );
};

export default OfferingBox;
