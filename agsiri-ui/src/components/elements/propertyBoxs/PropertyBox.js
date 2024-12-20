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
import { useSelector } from "react-redux";
import ImageSlider from "../ImageSlider";
import PropertyLabel from "../PropertyLabel";
import ThumbnailSlider from "../ThumbnailSlider";
import AddToCompareProducts from "../AddToCompareProducts";
import AddToWhishList from "../AddToWhishList";
import { getListingMedia } from "@/utils/getData";
import CurrencyFormatter from "@/utils/currencyFormatter";
import { useTranslation } from "react-i18next";


const PropertyBox = ({ data, relativeSlider, video, toPage }) => {
  const { t } = useTranslation("common");

  const [load, setLoad] = useState(true);
  const { symbol } = useSelector((state) => state.currencyReducer);
  const [images, setImages] = useState();
  const [imagesMeta, setImagesMeta] = useState();
  const [videos, setVideos] = useState();
  // const set = new Set();
  useEffect(() => {
    getListingMedia(`/listings/image/${data.listing_id}?limit=1`).then(res => {
      setImages(res.data.images);
      setImagesMeta(res.data.imagesMeta);
      setVideos(res.data.videos);
    });
  }, [data.listing_id]);

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with 0 if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-based, so add 1)
    const year = date.getFullYear(); // Get the full year

    return `${day}/${month}/${year}`;
  }
  return (
    <>
      {!load ? (
        <div className="property-box">
          <div className="property-image">
            {images && images.length > 0 ? <ImageSlider images={images.slice(0, 1)} /> : <img src='/assets/images/parallax/3.jpg' className="bg-img img-fluid" alt="" />}
            {/* {relativeSlider ? <ThumbnailSlider images={images} videoData={data.videos[0]} video={video} /> : <ImageSlider images={images} />} */}
            <div className="labels-left">
              <PropertyLabel labels={data.name} />
            </div>
            {!relativeSlider ? (
              <>
                {images ? <>
                  <div className="seen-data">
                    <Camera /> <span>{imagesMeta.totalItems}</span>
                  </div> </> : ""}
                  {data.status ? <>
                  <div className="seen-data-left label label-shadow ms-2">
                  <span>{data.status}</span>
                  </div> </> : ""}
                {/* <div className="overlay-property-box">
                  <a className="effect-round" title="Compare">
                    <AddToCompareProducts id={data.listing_id} />
                  </a>
                  <a className="effect-round like" title="wishlist">
                    <AddToWhishList id={data.listing_id} />
                  </a>
                </div> */}
              </>
            ) : ""}
          </div>

          <div className="property-details">
            <span className="font-roboto">{data?.address?.city || "USA"} </span>
            <Link href={{ pathname:"/listings/details", query: { id: data?.listing_id, toPage: toPage } }}>
              <h3>{data?.address?.house_number ? data?.address?.house_number : ""} {data.name}</h3>
            </Link>
            {data?.property_details?.financial?.price?.price && <>
              <h6>
                {/* {data?.property_details?.financial?.price?.price?.includes(",") ? `${symbol}${data?.property_details?.financial?.price?.price}` : <CurrencyFormatter value={Number(data?.property_details?.financial?.price?.price)} locale="en-US" currency={data?.property_details?.financial?.price?.currency ?? "USD"} /> */}
                 <CurrencyFormatter value={Number(data?.property_details?.financial?.price?.price)} locale="en-US" currency={data?.property_details?.financial?.price?.currency ?? "USD"} />
                
              </h6>
            </>}
            <p className="font-roboto">{data?.property_description || "This home provides wonderful entertaining spaces with a chef kitchen opening. Elegant retreat in a quiet Coral Gables setting.."} </p>
            <ul>
              <li>
                <img src="/assets/images/svg/icon/unlisted.svg" className="img-fluid" alt="" />
                {t("TOTAL_ACRES")} : {data?.property_highlights?.total_acres || "-"}
              </li>

              <li>
                <img src="/assets/images/svg/icon/double-bed.svg" className="img-fluid" alt="" />
                {t("BED")} : {data?.public_facts?.Beds || "-"}
              </li>
              <li>
                <img src="/assets/images/svg/icon/bathroom.svg" className="img-fluid" alt="" />
                {t("BATHS")} : {data?.public_facts?.Baths || "-"}
              </li>
              {/* <li>
                <img src="/assets/images/svg/icon/square-ruler-tool.svg" className="img-fluid" alt="" />
                Sq Ft : {data?.public_facts && data?.public_facts["Total_Sq_Ft_"] !== undefined && data?.public_facts["Total_Sq_Ft_"]|| "—"}
              </li> */}
            </ul>
            <div className="property-btn d-flex">
              <span>{formatDate(data?.built_on)}</span>

              <Link href={{ pathname: `/listings/details`, query: { id: data.listing_id, toPage: toPage } }}>
                <button type="button" className="btn btn-dashed btn-pill">
                  {t("DETAILS")}
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

export default PropertyBox;
